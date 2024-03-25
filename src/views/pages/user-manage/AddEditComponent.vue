<script setup>

//#region Imports
import AppDateTimePicker from "@/@core/components/app-form-elements/AppDateTimePicker.vue"
import AppSelect from "@/@core/components/app-form-elements/AppSelect.vue"
import { requiredValidator } from "@validators"
import * as userAPI from "@/api/userAPI"
import { useOverlayStore, useSnakBarStore, useLanguageStore } from "@/store"
import gioiTinhs from "@/enum/gioiTinhs"

//#endregion

//#region Props
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    required: true,
  },
  isUpdateLstUser: {
    type: Boolean,
    required: true,
  },
  userEdit: {
    type: Object,
    required: false,
  },
})

//#endregion

//#region Emits
const emit = defineEmits(["update:isDialogVisible", "update:isUpdateLstUser"])

//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()

//#endregion

//#region Variables
const gioiTinh = ref(1)
const ngaySinh = ref("2023-01-01")
const gitHub = ref("")
const userName = ref("")
const email = ref("")
const password = ref("")
const phoneNumber = ref("")
const refForm = ref()
const isFormValid = ref(false)
const isPasswordVisible = ref(false)

//#endregion

//#region Methods
const closeDialog = () => {
  emit("update:isDialogVisible", false)
}

const addUser = async () => {
  overlayStore.overlayVisible = true

  const response = await userAPI.addUser(
    userName.value,
    email.value,
    password.value,
    ngaySinh.value,
    gioiTinh.value == 1,
    gitHub.value,
    phoneNumber.value,
  )

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    emit("update:isUpdateLstUser", true)
    emit("update:isDialogVisible", false)
  }
}

const updateUser = async () => {
  overlayStore.overlayVisible = true

  const response = await userAPI.updateUser(
    props.userEdit.id,
    userName.value,
    email.value,
    ngaySinh.value,
    gioiTinh.value == 1,
    gitHub.value,
    phoneNumber.value,
  )

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    emit("update:isUpdateLstUser", true)
    emit("update:isDialogVisible", false)
  }
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      if (!props.isUpdate) {
        await addUser()
      } else {
        await updateUser()
      }
    }
  })
}

const dialogModelValueUpdate = val => {
  emit("update:isDialogVisible", true)
}

//#endregion

//#region Hooks
watch(props, () => {
  if (props.userEdit && props.isUpdate && props.isDialogVisible) {
    userName.value = props.userEdit.userName
    email.value = props.userEdit.email
    ngaySinh.value = props.userEdit.ngaySinh
    gioiTinh.value = props.userEdit.gioiTinh ? 1 : 0
    gitHub.value = props.userEdit.gitHub
    phoneNumber.value = props.userEdit.phoneNumber
  } else {
    gioiTinh.value = 1
    ngaySinh.value = "2023-01-01"
  }
})

//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="600"
    max-height="600"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <!-- Dialog Content -->
    <VCard
      :title="languageStore.isEn ? 'User Profile' : 'Thông tin người dùng'"
      style="border-radius: 20px"
    >
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="userName"
                :rules="[requiredValidator]"
                autofocus
                :label="languageStore.isEn ? 'User name' : 'Tên đăng nhập'"
              />
            </VCol>

            <!-- email -->
            <VCol cols="12">
              <AppTextField
                v-model="email"
                :rules="[requiredValidator]"
                :label="languageStore.isEn ? 'Email' : 'Email'"
                type="email"
              />
            </VCol>

            <VCol
              v-if="!props.isUpdate"
              cols="12"
            >
              <AppTextField
                v-model="password"
                :rules="[!props.isUpdate ? requiredValidator : null]"
                :label="languageStore.isEn ? 'Password' : 'Mật khẩu'"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <VCol cols="12">
              <AppDateTimePicker
                v-model="ngaySinh"
                :label="languageStore.isEn ? 'Date of birth' : 'Ngày sinh'"
                :rules="[requiredValidator]"
              />
            </VCol>

            <VCol cols="12">
              <AppSelect
                v-model="gioiTinh"
                :label="languageStore.isEn ? 'Sex' : 'Giới tính'"
                :items="gioiTinhs"
                item-title="title"
                item-value="value"
              />
            </VCol>

            <VCol cols="12">
              <AppTextField
                v-model="gitHub"
                :rules="[requiredValidator]"
                :label="languageStore.isEn ? 'Github' : 'Github'"
              />
            </VCol>

            <VCol cols="12">
              <AppTextField
                v-model="phoneNumber"
                :rules="[requiredValidator]"
                :label="languageStore.isEn ? 'Phone number' : 'Số điện thoại'"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn
            variant="tonal"
            color="secondary"
            @click="closeDialog"
          >
            {{ languageStore.isEn ? "Close" : "Đóng" }}
          </VBtn>
          <VBtn type="submit">
            {{ languageStore.isEn ? "Save" : "Lưu" }}
          </VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>
