<script setup>

//#region Imports
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import authV2ForgotPasswordIllustrationDark from "@images/pages/auth-v2-verify-email-illustration-dark.png"
import authV2ForgotPasswordIllustrationLight from "@images/pages/auth-v2-verify-email-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { onBeforeMount } from "vue"
import * as accountAPI from "@/api/accountAPI"
import { useOverlayStore, useSnakBarStore, useLanguageStore } from "@/store"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const route = useRoute()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const languageStore = useLanguageStore()

//#endregion

//#region Variables
const authThemeImg = useGenerateImageVariant(
  authV2ForgotPasswordIllustrationLight,
  authV2ForgotPasswordIllustrationDark,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const btnTitle = ref(`Your confirmation email has not been sent`)

//#endregion

//#region Methods
const sendEmail = async userName => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.sendEmailConfirmation(userName)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  btnTitle.value = response.notificationVi
}

const confirmEmail = async (userName, token) => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.confirmEmail(userName, token)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  btnTitle.value = response.notificationVi
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  if (route.query.userName !== undefined && route.query.token !== undefined) {
    await confirmEmail(route.query.userName, route.query.token)
  } else if (route.query.userName !== undefined) {
    await sendEmail(route.query.userName)
  }
})

//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <VRow
    class="auth-wrapper bg-surface"
    no-gutters
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="418"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h5 class="text-h5 mb-1">
            Verify your email ✉️
          </h5>
          <p>
            {{ btnTitle }}
          </p>

          <VBtn
            block=""
            to="/login"
            class="mb-6"
          >
            Go to login page
          </VBtn>

          <div class="d-flex align-center justify-center">
            <span class="me-1">Didn't get the mail? </span><a
              href="#"
              @click="sendEmail(route.query.userName)"
            >Resend</a>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
