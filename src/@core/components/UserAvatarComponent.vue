<template>
  <VBadge
    v-if="isShowVBsdge"
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    :color="online ? 'success' : 'secondary'"
  >
    <VAvatar
      color="primary"
      variant="tonal"
      :size="props.size"
    >
      <VImg
        v-if="props.avatar && imageError"
        :src="props.avatar.url"
        @error="handleImageError"
      />
      <span v-else>{{ avatarText(props.userName) }}</span>
    </VAvatar>
  </VBadge>
  <VAvatar
    v-else
    color="primary"
    variant="tonal"
    :size="props.size"
  >
    <VImg
      v-if="props.avatar && imageError"
      :src="props.avatar.url"
      @error="handleImageError"
    />
    <span v-else>{{ avatarText(props.userName) }}</span>
  </VAvatar>
</template>

<script setup>

//#region Imports
import { avatarText } from "@core/utils/formatters"
import * as userAPI from "@/api/userAPI"
import { onBeforeMount } from "vue"

//#endregion

//#region Props
const props = defineProps({
  avatar: {
    type: Object,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  isShowVBsdge: {
    type: Boolean,
    required: true,
  },
})

//#endregion

//#region Emits
//#endregion

//#region Use Stores
//#endregion

//#region Variables
const imageError = ref(true)
const online = ref(false)

//#endregion

//#region Methods
const handleImageError = () => {
  imageError.value = false
}

const loadOnline = async () => {
  if(props.isShowVBsdge)
  {
    const response = await userAPI.useronline(props.userName)
    if (response.statusCode === 200) {
      online.value = response.data
    } else {
      online.value = false
    }
  }
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  await loadOnline()
})

//#endregion

//#region SignalR Setup
//#endregion
</script>
