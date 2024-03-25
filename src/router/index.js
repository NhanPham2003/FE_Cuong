import { setupLayouts } from "virtual:generated-layouts"
import { createRouter, createWebHistory } from "vue-router"
import routes from "~pages"
import { isUserLoggedIn, isAccept } from "./utils"
import { useUserStore } from "@/store"
import { getCookie } from "@/utils/cookie"

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...setupLayouts(routes)],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.sessionId !== getCookie("sessionId")) {
    userStore.sessionId = getCookie("sessionId")

    return next({
      name: "login",
    })
  }

  if (
    getCookie("accessToken") &&
    userStore.user.roles &&
    !isAccept(userStore.user.roles, to.path)
  ) {
    return next({
      name: "not-authorized",
    })
  }

  if (
    isUserLoggedIn() &&
    to.path != "/login" &&
    to.path != "/register" &&
    to.path != "/verify-email" &&
    to.path != "/return-url-login" &&
    to.path != "/not-authorized"
  )
    return next({
      name: "login",
    })

  return next()
})

export default router
