import axios from "axios"

const config = {
  cloud_name: 'dytxbqbuv',
  api_key: '892757115949723',
  api_secret: 'Bx3UD15zZ2qNJ4E9jbKLTrkaQes',
  secure: true,
  upload_preset: "j5hucxqv",
  folder: "VuLanhCuongBlog",
}

export const uploadImage = async image => {
  return new Promise((resolve, reject) => {
    const form = new FormData()

    form.append('file', image)
    form.append('api_key', config.api_key)
    form.append('api_secret', config.api_secret)
    form.append("upload_preset", config.upload_preset)
    form.append("folder", config.folder)

    const axiosConfig = {
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload`,
      data: form,
      headers: {
      
      },
    }

    axios(axiosConfig)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}