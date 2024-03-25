<script setup>
import { beforeRouteEnter } from "./setup"

beforeRouteEnter(useRoute().path)

//#region Imports
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import pages401 from "@images/pages/401.png"
import miscMaskDark from "@images/pages/misc-mask-dark.png"
import miscMaskLight from "@images/pages/misc-mask-light.png"
import { useOverlayStore, useChatStore } from "@/store"
import { onBeforeMount } from "vue"
import { deleteCookie } from "@/utils/cookie"
import signalR from "@/signalR/signalR"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const overlayStore = useOverlayStore()
const chatStore = useChatStore()
const router = useRouter()

//#endregion

//#region Variables
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)

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
onBeforeMount(() => {
  overlayStore.overlayVisible = false
})

//#endregion
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-title="You are not authorized! 🔐"
      error-description="You do not have permission to view this page using the credentials that you have provided while login.
Please contact your site administrator."
    />
    <VBtn
      class="mb-12"
      @click="logout"
    >
      Go to Login
    </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="pages401"
        alt="Coming Soon"
        :max-width="170"
        class="mx-auto"
      />
    </div>

    <VImg
      :src="authThemeMask"
      class="misc-footer-img d-none d-md-block"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
