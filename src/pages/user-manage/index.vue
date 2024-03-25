<script setup>

//#region Imports
import { VDataTableServer } from "vuetify/labs/VDataTable"
import ExportDataToFile from "@/common/ExportDataToFile.vue"
import * as userAPI from "@/api/userAPI"
import { paginationMeta } from "@/utils/showList"
import { ref, computed, onBeforeMount } from "vue"
import roles from "@/enum/roles"
import status from "@/enum/userStatus"
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue"
import AddEditComponent from "@/views/pages/user-manage/AddEditComponent.vue"
import { useOverlayStore, useSnakBarStore, useLanguageStore } from "@/store"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()

//#endregion

//#region Variables
const userSelect = ref()
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  searchOption: {
    searchQuery: "",
    selectedRole: null,
    selectedStatus: null,
  },
})

const dialogComfirmDelete = ref(false)
const dialogComfirmLock = ref(false)
const dialogComfirmUnlock = ref(false)
const dialogAddEdit = ref(false)
const isUpdate = ref(false)
const isUpdateLstUser = ref(false)

const headers = computed(() => {
  return [
    {
      title: languageStore.isEn ? "User" : "Người dùng",
      key: "user",
      sortable: false,
    },
    {
      title: languageStore.isEn ? "Role" : "Vai trò",
      key: "roles",
      sortable: false,
    },
    {
      title: languageStore.isEn ? "Status" : "Trạng thái",
      key: "status",
      sortable: false,
    },
    {
      title: languageStore.isEn ? "Registration date" : "Ngày đăng kí",
      key: "ngayDangKi",
    },
    {
      title: languageStore.isEn ? "Actions" : "Hành động",
      key: "actions",
      sortable: false,
    },
  ]
})

const headersExport = computed(() => {
  return {
    id: languageStore.isEn ? "Id" : "Mã người dùng",
    userName: languageStore.isEn ? "User Name" : "Tên người dùng",
    normalizedUserName: languageStore.isEn
      ? "Normalized User Name"
      : "Tên người dùng chuẩn hóa",
    email: languageStore.isEn ? "Email" : "Địa chỉ Email",
    normalizedEmail: languageStore.isEn
      ? "Normalized Email"
      : "Email chuẩn hóa",
    emailConfirmed: languageStore.isEn
      ? "Email Confirmed"
      : "Email Đã Xác Nhận",
    passwordHash: languageStore.isEn ? "Password Hash" : "Mật khẩu Hash",
    securityStamp: languageStore.isEn ? "Security Stamp" : "Dấu Bảo Mật",
    concurrencyStamp: languageStore.isEn
      ? "Concurrency Stamp"
      : "Dấu Thời Gian Cùng Lúc",
    phoneNumber: languageStore.isEn ? "Phone Number" : "Số Điện Thoại",
    phoneNumberConfirmed: languageStore.isEn
      ? "Phone Number Confirmed"
      : "Số Điện Thoại Đã Xác Nhận",
    twoFactorEnabled: languageStore.isEn
      ? "Two Factor Enabled"
      : "Kích Hoạt Xác Minh Hai Yếu Tố",
    lockoutEnd: languageStore.isEn ? "Lockout End" : "Kết Thúc Khoá",
    lockoutEnabled: languageStore.isEn
      ? "Lockout Enabled"
      : "Chức Năng Khoá Đã Kích Hoạt",
    accessFailedCount: languageStore.isEn
      ? "Access Failed Count"
      : "Số Lần Truy Cập Không Thành Công",
    gioiTinh: languageStore.isEn ? "Gender" : "Giới Tính",
    ngaySinh: languageStore.isEn ? "Date of Birth" : "Ngày Sinh",
    gitHub: "GitHub",
    ngayDangKi: languageStore.isEn ? "Registration Date" : "Ngày Đăng Kí",
    avatar: languageStore.isEn ? "Avatar" : "Ảnh đại diện",
  }
})

const userListMeta = [
  {
    icon: "tabler-user",
    color: "primary",
    title: "Session",
    stats: "21,459",
    percentage: +29,
    subtitle: "Total Users",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Paid Users",
    stats: "4,567",
    percentage: +18,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Active Users",
    stats: "19,860",
    percentage: -14,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "Not authenticated Users",
    stats: "237",
    percentage: +42,
    subtitle: "Last week analytics",
  },
]

//#endregion

//#region Methods
const exportData = () => {
  return users.value.map(c => {
    const newUser = { ...c }

    newUser.avatar = newUser.avatar?.url

    return newUser
  })
}

const formatDateToDdMmYyyy = date => {
  const dateTime = new Date(date)
  const day = dateTime.getDate().toString().padStart(2, "0")
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0")
  const year = dateTime.getFullYear()

  return `${day}/${month}/${year}`
}

const fetchUsers = async () => {
  overlayStore.overlayVisible = true

  const response = await userAPI.getAllUser(options.value)

  overlayStore.overlayVisible = false
  if (response.statusCode === 200) {
    users.value = response.data.data
    totalUsers.value = response.data.totalData
    if (options.value.page > response.data.totalPage) {
      options.value.page = response.data.page
    }
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

const showAdd = () => {
  dialogAddEdit.value = true
  isUpdate.value = false
  userSelect.value = null
  isUpdateLstUser.value = false
}

const showEdit = user => {
  dialogAddEdit.value = true
  isUpdate.value = true
  userSelect.value = user
  isUpdateLstUser.value = false
}

const confirmDelete = user => {
  dialogComfirmDelete.value = true
  userSelect.value = user
}

const confirmLock = user => {
  dialogComfirmLock.value = true
  userSelect.value = user
}

const confirmUnlock = user => {
  dialogComfirmUnlock.value = true
  userSelect.value = user
}

const deleteUser = async event => {
  if (!event) {
    return
  }
  overlayStore.overlayVisible = true

  const response = await userAPI.deleteUser(userSelect.value.id)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    await fetchUsers()
  }
}

const lockUser = async event => {
  if (!event) {
    return
  }
  overlayStore.overlayVisible = true

  const response = await userAPI.lockUser(userSelect.value.id)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    await fetchUsers()
  }
}

const doneAddEdit = async event => {
  if (event === false && isUpdateLstUser.value) {
    await fetchUsers()
  }
}

const unlockUser = async event => {
  if (!event) {
    return
  }
  overlayStore.overlayVisible = true

  const response = await userAPI.unlockUser(userSelect.value.id)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    await fetchUsers()
  }
}

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === "admin")
    return {
      color: "secondary",
      icon: "tabler-device-laptop",
    }

  return {
    color: "primary",
    icon: "tabler-user",
  }
}

const resolveUserStatusVariant = user => {
  if (!user.lockoutEnabled && user.emailConfirmed)
    return [
      {
        color: "error",
        title: "Lock",
      },
    ]

  if (!user.emailConfirmed && user.lockoutEnabled)
    return [
      {
        color: "warning",
        title: "Not authenticated",
      },
    ]

  if (!user.emailConfirmed && !user.lockoutEnabled)
    return [
      {
        color: "warning",
        title: "Not authenticated",
      },
      {
        color: "error",
        title: "Lock",
      },
    ]

  return [
    {
      color: "success",
      title: "Active",
    },
  ]
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  await fetchUsers()
})

//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <div>
    <AddEditComponent
      v-model:isDialogVisible="dialogAddEdit"
      v-model:isUpdateLstUser="isUpdateLstUser"
      :user-edit="userSelect"
      :is-update="isUpdate"
      @update:is-dialog-visible="doneAddEdit($event)"
      @update:is-update-lst-user="isUpdateLstUser = $event"
    />
    <ConfirmDialog
      :confirm-title="languageStore.isEn ? 'Delete' : 'Xóa'"
      :cancel-title="languageStore.isEn ? 'Cancel' : 'Hủy'"
      :confirmation-question="
        languageStore.isEn
          ? 'You definitely want to delete'
          : 'Bạn chắc chắn muốn xóa'
      "
      :is-dialog-visible="dialogComfirmDelete"
      :is-show-two-dialog="false"
      @update:is-dialog-visible="dialogComfirmDelete = $event"
      @confirm="deleteUser"
    />
    <ConfirmDialog
      :confirm-title="languageStore.isEn ? 'Lock' : 'Khóa'"
      :cancel-title="languageStore.isEn ? 'Cancel' : 'Hủy'"
      :confirmation-question="
        languageStore.isEn
          ? 'You definitely want to lock'
          : 'Bạn chắc chắn muốn khóa'
      "
      :is-dialog-visible="dialogComfirmLock"
      :is-show-two-dialog="false"
      @update:is-dialog-visible="dialogComfirmLock = $event"
      @confirm="lockUser"
    />
    <ConfirmDialog
      :confirm-title="languageStore.isEn ? 'Unlock' : 'Mở khóa'"
      :cancel-title="languageStore.isEn ? 'Cancel' : 'Hủy'"
      :confirmation-question="
        languageStore.isEn
          ? 'You definitely want to unlock'
          : 'Bạn chắc chắn muốn mở khóa'
      "
      :is-dialog-visible="dialogComfirmUnlock"
      :is-show-two-dialog="false"
      @update:is-dialog-visible="dialogComfirmUnlock = $event"
      @confirm="unlockUser"
    />

    <VRow>
      <VCol
        v-for="meta in userListMeta"
        :key="meta.title"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="3"
        xxl="3"
      >
        <VCard style="border-radius: 15px">
          <VCardText class="d-flex justify-space-between">
            <div>
              <span>{{ meta.title }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h4">
                  {{ meta.stats }}
                </h6>
                <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'">( {{ meta.percentage > 0 ? "+" : "" }}
                  {{ meta.percentage }}%)</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard style="border-radius: 15px">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Role -->
              <VCol
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
                xl="6"
                xxl="6"
              >
                <AppSelect
                  v-model="options.searchOption.selectedRole"
                  :label="languageStore.isEn ? 'Select Role' : 'Chọn vai trò'"
                  :items="roles"
                  clearable
                  clear-icon="tabler-x"
                  @update:model-value="fetchUsers"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
                xl="6"
                xxl="6"
              >
                <AppSelect
                  v-model="options.searchOption.selectedStatus"
                  :label="
                    languageStore.isEn ? 'Select Status' : 'Chọn trạng thái'
                  "
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                  @update:model-value="fetchUsers"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="me-3 d-flex gap-3">
              <AppSelect
                v-model="options.itemsPerPage"
                :items="[
                  { value: 10, title: '10' },
                  { value: 25, title: '25' },
                  { value: 50, title: '50' },
                  { value: 100, title: '100' },
                  { value: -1, title: languageStore.isEn ? 'All' : 'Tất cả' },
                ]"
                style="width: 8rem"
                @update:model-value="fetchUsers"
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem">
                <AppTextField
                  v-model="options.searchOption.searchQuery"
                  :placeholder="languageStore.isEn ? 'Search' : 'Tìm kiếm'"
                  density="compact"
                  @change="fetchUsers"
                />
              </div>

              <!-- 👉 Export button -->
              <ExportDataToFile
                :data="users"
                :function-convert="exportData"
                file-name="User data"
                :headers-export="headersExport"
              />

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="showAdd"
              >
                {{ languageStore.isEn ? "Add New User" : "Thêm người dùng" }}
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:sort-by="options.sortBy"
            v-model:group-by="options.groupBy"
            v-model:page="options.page"
            :items="users"
            :items-length="totalUsers"
            :headers="headers"
            class="text-no-wrap"
            @update:sort-by="fetchUsers"
            @update:group-by="fetchUsers"
          >
            <!-- User -->
            <template #item.user="{ item }">
              <div class="d-flex align-center">
                <UserAvatarComponent
                  :avatar="item.raw.avatar"
                  :user-name="item.raw.userName"
                  :size="34"
                  is-show-v-bsdge
                />

                <div
                  class="d-flex flex-column"
                  style="margin-left: 10px"
                >
                  <h6 class="text-base">
                    {{ item.raw.userName }}
                  </h6>

                  <span class="text-sm text-medium-emphasis">{{
                    item.raw.email
                  }}</span>
                </div>
              </div>
            </template>

            <!-- 👉 Role -->
            <template #item.roles="{ item }">
              <div
                v-for="role in item.raw.roles"
                :key="role"
                class="d-flex align-center gap-4"
              >
                <VAvatar
                  :size="30"
                  :color="resolveUserRoleVariant(role).color"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveUserRoleVariant(role).icon"
                  />
                </VAvatar>
                <span class="text-capitalize">{{ role }}</span>
              </div>
            </template>

            <!-- Status -->
            <template #item.status="{ item }">
              <VChip
                v-for="statusItem in resolveUserStatusVariant(item.raw)"
                :key="statusItem"
                :color="statusItem.color"
                size="small"
                label
                class="text-capitalize"
                style="margin: 0 2px"
              >
                {{ statusItem.title }}
              </VChip>
            </template>

            <!-- Status -->
            <template #item.ngayDangKi="{ item }">
              <div>
                {{ formatDateToDdMmYyyy(item.raw.ngayDangKi) }}
              </div>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn @click="confirmDelete(item.raw)">
                <VIcon icon="tabler-trash" />
              </IconBtn>

              <IconBtn @click="showEdit(item.raw)">
                <VIcon icon="tabler-edit" />
              </IconBtn>

              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
              >
                <VIcon
                  size="24"
                  icon="tabler-dots-vertical"
                />

                <VMenu activator="parent">
                  <VList>
                    <VListItem
                      link
                      @click="confirmLock(item.raw)"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-lock" />
                      </template>

                      <VListItemTitle>
                        {{ languageStore.isEn ? "Lock" : "Khóa" }}
                      </VListItemTitle>
                    </VListItem>

                    <VListItem
                      link
                      @click="confirmUnlock(item.raw)"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-lock-open" />
                      </template>
                      <VListItemTitle>
                        {{ languageStore.isEn ? "Unlock" : "Mở khóa" }}
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalUsers, languageStore.isEn) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalUsers / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : 5"
                  @update:model-value="fetchUsers"
                >
                  <template #prev="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      {{ languageStore.isEn ? "Previous" : "Trước" }}
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      {{ languageStore.isEn ? "Next" : "Sau" }}
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
