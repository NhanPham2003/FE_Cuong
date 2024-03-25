<script setup>

//#region Imports
import { deleteCookie } from "@/utils/cookie"
import { useUserStore, useChatStore } from "@/store"
import UserAvatarComponent from "@core/components/UserAvatarComponent.vue"
import signalR from "@/signalR/signalR"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const userStore = useUserStore()
const chatStore = useChatStore()
const router = useRouter()

//#endregion

//#region Variables
//#endregion

//#region Methods
const logout = async () => {
  await signalR.stopConnection()
  deleteCookie("accessToken")
  deleteCookie("sessionId")
  chatStore.chatBox = []
  router.replace("/login")
}

//#endregion

//#region Hooks
//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <div>
    <UserAvatarComponent
      :avatar="userStore.avatar"
      :user-name="userStore.user.userName"
      :size="40"
      style="cursor: pointer;"
      is-show-v-bsdge
    />

    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <UserAvatarComponent
                :avatar="userStore.avatar"
                :user-name="userStore.user.userName"
                :size="40"
                is-show-v-bsdge
              />
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ userStore.user.userName }}
          </VListItemTitle>
          <VListItemSubtitle>
            {{
              userStore.user.roles.includes("Admin")
                ? "Admin"
                : userStore.user.roles.includes("Censor")
                  ? "Censor"
                  : "User"
            }}
          </VListItemSubtitle>
        </VListItem>

        <VDivider class="my-2" />

        <!-- 👉 Profile -->
        <VListItem link>
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-user"
              size="22"
            />
          </template>

          <VListItemTitle>Profile</VListItemTitle>
        </VListItem>

        <!-- 👉 Settings -->
        <VListItem link>
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-settings"
              size="22"
            />
          </template>

          <VListItemTitle>Settings</VListItemTitle>
        </VListItem>

        <!-- 👉 Pricing -->
        <VListItem link>
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-currency-dollar"
              size="22"
            />
          </template>

          <VListItemTitle>Pricing</VListItemTitle>
        </VListItem>

        <!-- 👉 FAQ -->
        <VListItem link>
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-help"
              size="22"
            />
          </template>

          <VListItemTitle>FAQ</VListItemTitle>
        </VListItem>

        <!-- Divider -->
        <VDivider class="my-2" />

        <!-- 👉 Logout -->
        <VListItem @click="logout">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-logout"
              size="22"
            />
          </template>

          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </div>
</template>
