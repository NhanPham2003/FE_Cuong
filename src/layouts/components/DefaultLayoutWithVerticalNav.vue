<script setup>
import navItems from "@/navigation/vertical"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import ChatComponent from "./ChatComponent.vue"
import Footer from "@/layouts/components/Footer.vue"
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue"
import UserProfile from "@/layouts/components/UserProfile.vue"
import { useLanguageStore, useUserStore } from "@/store"

// @layouts plugin
import { VerticalNavLayout } from "@layouts"

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()

const languageStore = useLanguageStore()
const userStore = useUserStore()
const router=  useRouter()

if(!userStore.user.roles)
{
  router.replace("/login")
}

const navItemsRenew = userStore.user.roles?[...navItems].map(c => {
  if (!c.children && c.roles.find(n => userStore.user.roles.includes(n))) {
    return c
  } else {
    const nav = { ...c }

    nav.children = nav.children.filter(m =>
      m.roles.find(n => userStore.user.roles.includes(n)),
    )

    return nav
  }
}):[]

const swithLanguage = () => {
  languageStore.isEn = !languageStore.isEn
}
</script>

<template>
  <VerticalNavLayout :nav-items="navItemsRenew">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <NavbarThemeSwitcher />

        <IconBtn @click="swithLanguage">
          <VIcon
            icon="tabler-language"
            size="26"
          />
        </IconBtn>

        <VSpacer />

        <ChatComponent />

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
