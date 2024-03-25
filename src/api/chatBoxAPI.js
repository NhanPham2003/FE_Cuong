import axiosIns from "@/plugins/axios"

export function getAllChatBox(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/ChatBox/allchatBox`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getChatBox(chatBoxId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/ChatBox/chatbox?chatBoxId=${encodeURIComponent(chatBoxId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteChatBox(chatBoxId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/ChatBox/deletechatbox?chatBoxId=${encodeURIComponent(chatBoxId)}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addChatBox(title, isGroup) {
  const data = {
    title: title,
    isGroup: isGroup,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/ChatBox/addchatbox`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateChatBox(chatBoxId, title, isGroup) {
  const data = {
    id: chatBoxId,
    title: title,
    isGroup: isGroup,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/ChatBox/updatechatbox`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function chatBoxForUser(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/ChatBox/chatboxforuser?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
