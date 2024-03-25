import axiosIns from "@/plugins/axios"

export function getAllPost(options) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Post/allpost`, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getPost(postId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Post/post?postId=${encodeURIComponent(postId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deletePost(postId) {
  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Post/deletepost?postId=${encodeURIComponent(postId)}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addPost(userId, title, subTitle, contentHTML, banner, tags) {
  const data = {
    title: title,
    subTitle: subTitle,
    contentHTML: contentHTML,
    userId: userId,
    banner: {
      url: banner,
    },
    postTags: tags.map(c => ({ tagId: c })),
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Post/addpost`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updatePost(
  postId,
  userId,
  title,
  subTitle,
  contentHTML,
  banner,
  tags,
) {
  const data = {
    id: postId,
    title: title,
    subTitle: subTitle,
    contentHTML: contentHTML,
    userId: userId,
    banner: {
      url: banner,
    },
    postTags: tags.map(c => ({ tagId: c, postId: postId })),
  }

  return new Promise((resolve, reject) => {
    axiosIns
      .post(`api/Post/updatepost`, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
