<script setup>

//#region Imports
import { setCookie, getCookie } from "@/utils/cookie"
import * as accountAPI from "@/api/accountAPI"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant"
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png"
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png"
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png"
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import gioiTinhs from "@/enum/gioiTinhs"
import {
  useUserStore,
  useOverlayStore,
  useSnakBarStore,
  useLanguageStore,
} from "@/store"
import signalR from "@/signalR/signalR"
import { onBeforeMount } from "vue"
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
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

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
const gioiTinh = ref(1)
const ngaySinh = ref("2023-01-01")
const gitHub = ref("")
const userName = ref("")
const phoneNumber = ref("")
const refForm = ref()
const isFormValid = ref(false)
const googleInforEmail = ref("")
const googleInforPicture = ref("")
const facebookInforEmail = ref("")
const facebookInforPicture = ref("")
const accountNotExits = ref(false)

//#endregion

//#region Methods
const connectSignalR = async () => {
  if (getCookie("accessToken")) {
    await signalR.startConnection()
  }
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      if (route.query.state !== undefined && route.query.code !== undefined) {
        if (JSON.parse(route.query.state).type === "google") {
          await loginGoogle()
        } else if (JSON.parse(route.query.state).type === "facebook") {
          await loginFacebook()
        }
      } else {
        router.replace("/login")
      }
    } else {
      nextTick(() => {
        ngaySinh.value = "2023-1-1"
        gioiTinh.value = 1
      })
    }
  })
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

const loginGoogle = async () => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.googleResponse(
    googleInforEmail.value,
    googleInforPicture.value,
    userName.value,
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
    setCookie("accessToken", response.data, 30)
    setCookie("sessionId", generateGuid(), 30)
    localStorage.setItem("remember", false)
    await reLogin()
    await connectSignalR()
  }
}

const googleResponseCheckUserInfor = async () => {
  overlayStore.overlayVisible = true
  var response = {}
  try {
    response = await accountAPI.googleResponseCheckUserInfor(route.query.code)
  } catch (error) {
    overlayStore.overlayVisible = false
    router.replace("/login")

    return
  }
  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 404) {
    accountNotExits.value = true
    googleInforEmail.value = response.data.email
    googleInforPicture.value = response.data.picture
  } else if (response.statusCode === 200) {
    setCookie("accessToken", response.data, 30)
    setCookie("sessionId", generateGuid(), 30)
    localStorage.setItem("remember", false)
    await reLogin()
    await connectSignalR()
  } else {
    overlayStore.overlayVisible = false
    router.replace("/login")
  }
}

const facebookResponseCheckUserInfor = async () => {
  overlayStore.overlayVisible = true
  var response = {}
  try {
    response = await accountAPI.facebookResponseCheckUserInfor(
      route.query.code,
    )
  } catch (error) {
    overlayStore.overlayVisible = false
    router.replace("/login")

    return
  }
  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 404) {
    accountNotExits.value = true
    facebookInforEmail.value = response.data.email
    facebookInforPicture.value = response.data.picture
  } else if (response.statusCode === 200) {
    setCookie("accessToken", response.data, 30)
    setCookie("sessionId", generateGuid(), 30)
    localStorage.setItem("remember", false)
    await reLogin()
    await connectSignalR()
  } else {
    overlayStore.overlayVisible = false
    router.replace("/login")
  }
}

const loginFacebook = async () => {
  overlayStore.overlayVisible = true

  const response = await accountAPI.facebookResponse(
    facebookInforEmail.value,
    facebookInforPicture.value,
    userName.value,
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
    setCookie("accessToken", response.data, 30)
    setCookie("sessionId", generateGuid(), 30)
    localStorage.setItem("remember", false)
    await reLogin()
    await connectSignalR()
  }
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  if (route.query.state !== undefined && route.query.code !== undefined) {
    if (JSON.parse(route.query.state).type === "google") {
      await googleResponseCheckUserInfor()
    } else if (JSON.parse(route.query.state).type === "facebook") {
      await facebookResponseCheckUserInfor()
    }
  } else {
    router.replace("/login")
  }
})

//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <VRow
    v-if="accountNotExits"
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
                    :label="
                      languageStore.isEn ? 'Phone number' : 'Số điện thoại'
                    "
                  />
                </VCol>
              </VRow>
            </VCardText>
            <VCardText class="d-flex justify-end flex-wrap gap-3">
              <VBtn type="submit">
                Save
              </VBtn>
            </VCardText>
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
