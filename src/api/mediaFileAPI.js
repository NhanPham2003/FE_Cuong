import axiosIns from "@/plugins/axios"

export function getAllMediaFile(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/MediaFile/allmediafile`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteMediaFile(mediaFileId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/MediaFile/deletemediafile?mediaFileId=${encodeURIComponent(
          mediaFileId,
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

export function addMediaFile(file, folderName) {
  var data = new FormData()
  data.append("mediaFile", file)

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/MediaFile/addmediafile?folderName=${folderName}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateMediaFile(mediaFileId, file, folderName) {
  var data = new FormData()
  data.append("mediaFile", file)

  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/MediaFile/updatemediafile?mediaFileId=${mediaFileId}&folderName=${folderName}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
