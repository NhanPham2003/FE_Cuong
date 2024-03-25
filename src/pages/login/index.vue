<script setup>

//#region Imports
import { VForm } from "vuetify/components/VForm"
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue"
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png"
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png"
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png"
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { setCookie, getCookie } from "@/utils/cookie"
import * as accountAPI from "@/api/accountAPI"
import { requiredValidator } from "@validators"
import {
  useUserStore,
  useOverlayStore,
  useSnakBarStore,
  useLanguageStore,
} from "@/store"
import signalR from "@/signalR/signalR"
import { generateGuid } from "@/utils/guid"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const languageStore = useLanguageStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

//#endregion

//#region Variables
const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const refVForm = ref()
const userName = ref("")
const password = ref("")
const rememberMe = ref(true)

//#endregion

//#region Methods
const connectSignalR = async () => {
  if (getCookie("accessToken")) {
    await signalR.startConnection()
  }
}

const reLogin = async () => {
  const accessToken = getCookie("accessToken")

  userStore.sessionId = getCookie("sessionId")
  if (accessToken) {
    overlayStore.overlayVisible = true

    const response = await accountAPI.decodeJwt(accessToken)

    overlayStore.overlayVisible = false
    userStore.user = response.data
    userStore.avatar = response.data.avatar
    router.replace(route.query.to ? String(route.query.to) : "/")
  }
}

const login = async () => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.login(userName.value, password.value)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    setCookie("accessToken", response.data, 30)
    setCookie("sessionId", generateGuid(), 30)
    localStorage.setItem("remember", rememberMe.value)
    await reLogin()
    await connectSignalR()
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) await login()
  })
}

//#endregion

//#region Hooks
//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
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
            {{ languageStore.isEn ? "Welcome to" : "Chào mừng đến với" }}
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>

          <p class="mb-0">
            {{
              languageStore.isEn
                ? "Please sign-in to your account and start the adventure"
                : "Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu trải nghiệm"
            }}
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- userName -->
              <VCol cols="12">
                <AppTextField
                  v-model="userName"
                  :rules="[requiredValidator]"
                  :label="languageStore.isEn ? 'User name' : 'Tên đăng nhập'"
                  autofocus
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator]"
                  :label="languageStore.isEn ? 'Password' : 'Mật khẩu'"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    :label="languageStore.isEn ? 'Remember me' : 'Nhớ mật khẩu'"
                  />
                  <a
                    class="text-primary ms-2 mb-1"
                    href="#"
                  >
                    {{
                      languageStore.isEn ? "Forgot Password?" : "Quên mật khẩu"
                    }}
                  </a>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  {{ languageStore.isEn ? "Login" : "Đăng nhập" }}
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>{{
                  languageStore.isEn
                    ? "New on our platform?"
                    : "Là người dùng mới"
                }}</span>

                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  {{
                    languageStore.isEn
                      ? " Create an account"
                      : "Tạo tài khoản mới"
                  }}
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />

                <span class="mx-4">{{
                  languageStore.isEn ? "or" : "Hoặc"
                }}</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
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
