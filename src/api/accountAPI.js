import axiosIns from "@/plugins/axios"

export function login(userName, password) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/login?userName=${encodeURIComponent(
          userName,
        )}&password=${encodeURIComponent(password)}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function registerUser(
  userName,
  email,
  password,
  ngaySinh,
  gioiTinh,
  gitHub,
  phoneNumber,
) {
  const data = {
    userName: userName,
    email: email,
    phoneNumber: phoneNumber,
    gioiTinh: gioiTinh,
    ngaySinh: ngaySinh,
    gitHub: gitHub,
    password: password,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Account/registeruser`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function sendEmailConfirmation(userName) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Account/sendemail?userName=${encodeURIComponent(userName)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function confirmEmail(userName, token) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/confirmemail?userName=${encodeURIComponent(
          userName,
        )}&token=${encodeURIComponent(token)}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function generateAuthUrlGoogle() {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Account/generateauthurlgoogle`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function googleResponse(
  email,
  picture,
  userName,
  ngaySinh,
  gioiTinh,
  gitHub,
  phoneNumber,
) {
  const data = {
    userName: userName,
    email: email,
    phoneNumber: phoneNumber,
    gioiTinh: gioiTinh,
    ngaySinh: ngaySinh,
    gitHub: gitHub,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/googleresponse?picture=${encodeURIComponent(picture)}`,
        data,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function googleResponseCheckUserInfor(code) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/googleresponsecheckuserinfo?code=${encodeURIComponent(
          code,
        )}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function facebookResponse(
  email,
  picture,
  userName,
  ngaySinh,
  gioiTinh,
  gitHub,
  phoneNumber,
) {
  const data = {
    userName: userName,
    email: email,
    phoneNumber: phoneNumber,
    gioiTinh: gioiTinh,
    ngaySinh: ngaySinh,
    gitHub: gitHub,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/facebookresponse?picture=${encodeURIComponent(picture)}`,
        data,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function facebookResponseCheckUserInfor(code) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Account/facebookresponsecheckuserinfo?code=${encodeURIComponent(
          code,
        )}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function decodeJwt(token) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Account/decodejwt?token=${encodeURIComponent(token)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
