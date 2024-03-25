import axiosIns from "@/plugins/axios"

export function getAllMessage(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Message/allmessage`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getMessage(messageId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Message/message?messageId=${encodeURIComponent(messageId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteMessage(messageId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/Message/deletemessage?messageId=${encodeURIComponent(messageId)}`,
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addMessage(msg, userChatBoxId) {
  const data = {
    userChatBoxId: userChatBoxId,
    msg: msg,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Message/addmessage`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateMessage(messageId, msg, userChatBoxId) {
  const data = {
    id: messageId,
    userChatBoxId: userChatBoxId,
    msg: msg,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Message/updatemessage`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
