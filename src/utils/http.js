import axiosIns from "@/plugins/axios"

export async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    axiosIns
      .get(url)
      .then(response => {
        resolve(response.status === 200)
      })
      .catch(error => {
        resolve(false)
      })
  })
}
