import axiosIns from "@/plugins/axios"

export function getAllUser(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/alluser`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getUser(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/user?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/deleteuser?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function lockUser(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/lockuser?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function unlockUser(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/unlockuser?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addUser(
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
      .post(`api/User/adduser`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateUser(
  userId,
  userName,
  email,
  ngaySinh,
  gioiTinh,
  gitHub,
  phoneNumber,
) {
  const data = {
    id: userId,
    userName: userName,
    email: email,
    phoneNumber: phoneNumber,
    gioiTinh: gioiTinh,
    ngaySinh: ngaySinh,
    gitHub: gitHub,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/updateuser`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function useronline(userName) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/User/useronline?userName=${encodeURIComponent(userName)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}