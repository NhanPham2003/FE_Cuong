import Cookies from "js-cookie"

export function setCookie(name, value, days) {
  if (days) {
    Cookies.set(name, value, { expires: days })
  } else {
    Cookies.set(name, value)
  }
}

export function getCookie(name) {
  return Cookies.get(name)
}

export function deleteCookie(name) {
  Cookies.remove(name)
}
