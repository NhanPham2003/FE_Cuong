<template>
  <VCard style="border-radius: 20px">
    <VCardText>
      <div
        style="
          display: flex;
          justify-content: start;
          align-items: center;
          cursor: pointer;
        "
      >
        <UserAvatarComponent
          :avatar="props.userAvatar"
          :user-name="props.userName"
          :size="45"
          is-show-v-bsdge
        />
        <div style="margin-left: 20px">
          <p
            style="
              margin: 0;
              display: inline-block;
              font-weight: 600;
              font-size: 18px;
            "
          >
            {{ props.userName }}
          </p>
          <p style="font-size: 12px; margin-block-end: 0">
            {{
              dayjs(props.dateUpdate)
                .locale(languageStore.isEn ? "en" : "vi")
                .fromNow()
            }}
          </p>
        </div>
        <div
          v-if="
            !props.followDetails.includes(props.userId) &&
              props.userId !== userStore.user.id
          "
          style="margin-left: 20px"
          @click="follow"
        >
          <p style="color: #7367f0">
            Theo dõi
          </p>
        </div>
      </div>
    </VCardText>
    <VCardText>
      <VChip
        v-for="(item, index) in props.tags"
        :key="index"
        style="margin-right: 5px; margin-bottom: 10px"
        color="primary"
      >
        {{ item }}
      </VChip>
    </VCardText>
    <VCardText>
      <h3 style="margin-bottom: 10px">
        {{ props.title }}
      </h3>
      <p>{{ props.subTitle }}</p>
    </VCardText>
    <VCardText>
      <VImg
        :src="props.banner"
        cover
        class="text-white"
        style="border-radius: 10px"
      />
    </VCardText>
    <VCardText>
      <div style="display: flex; align-items: center; justify-content: start">
        <VMenu
          location="top center"
          style="cursor: pointer"
        >
          <template #activator="{ props }">
            <VIcon
              v-bind="props"
              icon="tabler-heart"
              size="28"
              style="margin-right: 8px"
            />
            {{ 1000 }}
          </template>
          <VList style="margin-bottom: 10px">
            <VHover
              v-for="item in lstIconIneract"
              :key="item.id"
            >
              <template #default="{ isHovering, props }">
                <VIcon
                  v-bind="props"
                  :icon="item.icon"
                  style="margin-left: 5px; margin-right: 10px"
                  :color="isHovering ? 'primary' : undefined"
                  size="22"
                />
              </template>
            </VHover>
          </VList>
        </VMenu>
        <VIcon
          icon="tabler-message-dots"
          size="28"
          style="margin-right: 8px; margin-left: 30px"
          @click="isOpenComment = !isOpenComment"
        />
        {{ 1000 }}
        <VIcon
          icon="tabler-share-3"
          size="28"
          style="margin-right: 8px; margin-left: 30px"
        />
        {{ 1000 }}
      </div>
    </VCardText>
    <VCardText v-if="isOpenComment">
      <div style="display: flex; justify-content: center; gap: 15px">
        <UserAvatarComponent
          :avatar="props.userAvatar"
          :user-name="props.userName"
          :size="40"
          is-show-v-bsdge
        />
        <AppTextarea
          :rows="1"
          auto-grow
          variant="solo"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<script setup>

//#region Imports
import dayjs from "dayjs"
import * as followDetailAPI from "@/api/followDetailAPI"
import {
  useUserStore,
  useOverlayStore,
  useSnakBarStore,
  useLanguageStore,
} from "@/store"
import UserAvatarComponent from "@core/components/UserAvatarComponent.vue"
import AppTextarea from "@/@core/components/app-form-elements/AppTextarea.vue"

//#endregion

//#region Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  userAvatar: {
    type: Object,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  dateUpdate: {
    type: Date,
    required: true,
  },
  followDetails: {
    type: Array,
    required: true,
  },
})

//#endregion

//#region Emits
const emit = defineEmits(["update:followDetails"])

//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const userStore = useUserStore()

//#endregion

//#region Variables
const lstIconIneract = [
  { icon: "tabler-thumb-up-filled", id: 1 },
  { icon: "tabler-heart-filled", id: 2 },
  { icon: "mdi-emoticon-excited", id: 3 },
  { icon: "mdi-emoticon", id: 4 },
  { icon: "mdi-emoticon-cry", id: 5 },
]

const isOpenComment = ref(false)

//#endregion

//#region Methods
const follow = async () => {
  overlayStore.overlayVisible = true

  const response = await followDetailAPI.addFollowDetail(
    userStore.user.id,
    props.userId,
    false,
  )

  emit("update:followDetails", props.userId)

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
}

//#endregion

//#region Hooks
//#endregion

//#region SignalR Setup
//#endregion
</script>
