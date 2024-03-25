import axiosIns from "@/plugins/axios"

export function sestSignalRHub(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`https://localhost:44352/api/Test/testsignalrhub?id=111`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
