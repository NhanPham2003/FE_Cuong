export default function (mediaFileId) {
  return `${import.meta.env.VITE_BACK_END_URL}api/MediaFile/mediafile?mediaFileId=${mediaFileId}`
}