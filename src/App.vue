<script setup>
import { useTheme } from "vuetify"
import ScrollToTop from "@core/components/ScrollToTop.vue"
import ChatContainer from "@core/components/ChatContainer.vue"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import { hexToRgb } from "@layouts/utils"
import { useOverlayStore } from "@/store/overlay"
import { useSnakBarStore } from "@/store/snakbar"
import { useUserStore } from "@/store/user"
import * as accountAPI from "@/api/accountAPI"
import { getCookie, deleteCookie } from "@/utils/cookie"
import giphy from "@images/gif/giphy.gif"
import signalR from "@/signalR/signalR"
import "dayjs/locale/vi"
import "dayjs/locale/en"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig()

const { global } = useTheme()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const userStore = useUserStore()
const router = useRouter()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()

const checkAccessToken = async () => {
  const accessToken = getCookie("accessToken")

  userStore.sessionId = getCookie("sessionId")

  if (accessToken) {
    overlayStore.overlayVisible = true

    try {
      const response = await accountAPI.decodeJwt(accessToken)

      overlayStore.overlayVisible = false
      if (response.statusCode === 200) {
        userStore.user = response.data
        userStore.avatar = response.data.avatar
      } else {
        throw null
      }
    } catch (error) {
      deleteCookie("accessToken")
      deleteCookie("sessionId")
      overlayStore.overlayVisible = false
      router.replace("/login")
    }
  }
}

const connectSignalR = async () => {
  if (getCookie("accessToken")) {
    await signalR.startConnection()
  }
}

await checkAccessToken()
await connectSignalR()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <RouterView />
      <ScrollToTop />
      <ChatContainer />
      <VOverlay
        v-model="overlayStore.overlayVisible"
        persistent
        class="align-center justify-center"
      >
        <VImg
          width="100"
          :src="giphy"
        />
      </VOverlay>
      <VSnackbar
        v-model="snakBarStore.snakbarVisible"
        transition="scale-transition"
        location="top end"
      >
        {{ snakBarStore.snakbarContent }}
        <template #actions>
          <VBtn
            color="error"
            @click="snakBarStore.snakbarVisible = false"
          >
            Close
          </VBtn>
        </template>
      </VSnackbar>
    </VApp>
  </VLocaleProvider>
</template>
