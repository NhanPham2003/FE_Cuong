<script setup>

//#region Imports
import { VForm } from "vuetify/components/VForm"
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png"
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png"
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png"
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue"
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { requiredValidator } from "@validators"
import * as accountAPI from "@/api/accountAPI"
import gioiTinhs from "@/enum/gioiTinhs"
import { useOverlayStore, useSnakBarStore, useLanguageStore  } from "@/store"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const router = useRouter()

//#endregion

//#region Variables
const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const refVForm = ref()
const userName = ref("johnDoe")
const email = ref("john@example.com")
const password = ref("191023")
const privacyPolicies = ref(false)
const gioiTinh = ref(1)
const ngaySinh = ref("2023-01-01")
const gitHub = ref("")
const phoneNumber = ref("")
const isPasswordVisible = ref(false)

//#endregion

//#region Methods
const register = async () => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.registerUser(
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
    router.replace(`/verify-email?userName=${userName.value}`)
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) await register()
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
            max-width="441"
            :src="imageVariant"
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
      lg="4"
      class="d-flex align-center justify-center"
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
            {{
              languageStore.isEn
                ? "Adventure starts here 🚀"
                : "Cuộc khám phá bắt đầu từ đây 🚀"
            }}
          </h5>
          <p class="mb-0">
            {{
              languageStore.isEn
                ? "Make your app management easy and fun!"
                : "Làm cho việc quản lý ứng dụng của bạn trở nên dễ dàng và thú vị!"
            }}
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- Username -->
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

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        {{
                          languageStore.isEn ? "I agree to" : "Tôi dồng í với"
                        }}
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                        >
                          {{
                            languageStore.isEn
                              ? "privacy policy & terms"
                              : "chính sách và điều khoản bảo mật"
                          }}</a>
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  {{ languageStore.isEn ? "Sign up" : "Đăng kí" }}
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>{{
                  languageStore.isEn
                    ? "Already have an account?"
                    : "Đã có có tài khoản?"
                }}</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  {{
                    languageStore.isEn
                      ? "Sign in instead"
                      : "Thay vào đó hãy đăng nhập"
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
