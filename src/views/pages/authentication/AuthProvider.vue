<script setup>
import { useTheme } from "vuetify"

const { global } = useTheme()

const authProviders = [
  {
    icon: "fa-facebook",
    color: "#4267b2",
    href: `https://www.facebook.com/dialog/oauth?client_id=839817544818199&response_type=code&scope=public_profile&redirect_uri=${import.meta.env.VITE_FRONT_END_URL}return-url-login&state=%7b%22type%22%3a%22facebook%22%7d`,
  },
  {
    icon: "fa-google",
    color: "#dd4b39",
    href: `https://accounts.google.com/o/oauth2/auth?client_id=148844519783-l8b3n1c2qche4s92dar5apev0tuh6a1h.apps.googleusercontent.com&redirect_uri=${import.meta.env.VITE_FRONT_END_URL}return-url-login&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&state=%7b%22type%22%3a%22google%22%7d`,
  },
]
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <VBtn
      v-for="link in authProviders"
      :key="link.icon"
      icon
      variant="tonal"
      size="38"
      :color="global.name.value === 'dark' ? link.colorInDark : link.color"
      class="rounded"
    >
      <a :href="link.href">
        <VIcon
          size="18"
          :icon="link.icon"
        /></a>
    </VBtn>
  </div>
</template>
