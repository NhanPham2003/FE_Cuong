import axiosIns from "@/plugins/axios"

export function getAllFollowDetail(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/FollowDetail/allfollowdetail`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getFollowDetail(followDetailId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/FollowDetail/followdetail?followDetailId=${encodeURIComponent(
          followDetailId,
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

export function deleteFollowDetail(followDetailId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(
        `api/FollowDetail/deletefollowdetail?followDetailId=${encodeURIComponent(
          followDetailId,
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

export function addFollowDetail(userFromId, userToId, isAddFriend) {
  const data = {
    userFromId: userFromId,
    userToId: userToId,
    isAddFriend: isAddFriend,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/FollowDetail/addfollowdetail`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateFollowDetail(
  followDetailId,
  userFromId,
  userToId,
  isAddFriend,
) {
  const data = {
    id: followDetailId,
    userFromId: userFromId,
    userToId: userToId,
    isAddFriend: isAddFriend,
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/FollowDetail/updatefollowdetail`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getAllFriend(userId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/FollowDetail/allfriend?userId=${encodeURIComponent(userId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
