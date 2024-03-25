import axios from "axios"
import { getCookie, deleteCookie } from "@/utils/cookie"
import router from "@/router"
import { useUserStore } from "@/store"

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BACK_END_URL,
  timeout: 100000000,

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "*/*",
  },
})

axiosIns.interceptors.request.use(config => {
  const userStore = useUserStore()

  if (userStore.sessionId !== getCookie("sessionId")) {
    router.replace("/login")
  }
  const token = getCookie("accessToken")
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = token ? `Bearer ${token}` : ""
  }

  return config
})

axiosIns.interceptors.response.use(
  response => {
    return response
  },

  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      router.replace("/not-authorized")
    } else {
      return Promise.reject(error)
    }
  },
)

export default axiosIns
