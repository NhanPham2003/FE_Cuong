import axiosIns from "@/plugins/axios"

export function getAllTag(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Tag/alltag`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getTag(tagId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Tag/tag?tagId=${encodeURIComponent(tagId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteTag(tagId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Tag/deletetag?tagId=${encodeURIComponent(tagId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addTag(title) {
  const data = {
    title: title,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Tag/addtag`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateTag(tagId, title) {
  const data = {
    id: tagId,
    title: title,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Tag/updatetag`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
