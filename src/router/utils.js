import { getCookie } from "@/utils/cookie"
import roles from "@/navigation/vertical/roles"

const endPoint = [
  {
    to: "/",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    to: "/login",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    to: "/register",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    to: "/return-url-login",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    to: "/user-manage",
    roles: [roles.Admin],
  },
  {
    to: "/verify-email",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
  {
    to: "/not-authorized",
    roles: [roles.Admin, roles.Censor, roles.User],
  },
]

export const isAccept = (roles, to) => {
  return endPoint.find(c => c.to === to).roles.find(c => roles.includes(c))
}

export const isUserLoggedIn = () => getCookie("accessToken") == null
