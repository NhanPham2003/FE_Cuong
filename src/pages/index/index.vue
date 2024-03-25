<template>
  <div>
    <CreateNewPost
      :is-dialog-visible="dialogCKEditor"
      :tags="tags"
      @update:is-dialog-visible="dialogCKEditor = $event"
      @confirm="createNewPost"
    />
    <VWindow show-arrows>
      <VWindowItem>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <VCard
            v-for="i in 3"
            :key="i"
            title="C#"
            text="Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as"
            style="height: 200px; width: 30%; border-radius: 20px"
          />
        </div>
      </VWindowItem>
      <VWindowItem>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <VCard
            v-for="i in 3"
            :key="i"
            title="C#"
            text="Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as"
            style="height: 200px; width: 30%; border-radius: 20px"
          />
        </div>
      </VWindowItem>
      <VWindowItem>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <VCard
            v-for="i in 3"
            :key="i"
            title="C#"
            text="Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as"
            style="height: 200px; width: 30%; border-radius: 20px"
          />
        </div>
      </VWindowItem>
    </VWindow>
    <VRow style="margin-top: 50px">
      <VCol
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="8"
        xl="9"
        xxl="10"
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
          "
        >
          <UserAvatarComponent
            :avatar="userStore.avatar"
            :user-name="userStore.user.userName"
            :size="45"
            is-show-v-bsdge
          />
          <VBtn
            variant="outlined"
            color="black"
            style="
              border-radius: 20px;
              margin-left: 20px;
              width: calc(100% - 60px);
            "
            @click="dialogCKEditor = true"
          >
            {{
              languageStore.isEn ? "What is on your mind?" : "Bạn đang nghĩ gì"
            }}
          </VBtn>
        </div>
      </VCol>
      <VCol
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="4"
        xl="3"
        xxl="2"
      />
    </VRow>
    <VRow style="margin-top: 20px">
      <VCol
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="8"
        xl="9"
        xxl="10"
      >
        <PostComponent
          v-for="item in posts"
          :key="item.id"
          style="margin-bottom: 20px"
          :title="item.title"
          :sub-title="item.subTitle"
          :banner="item.banner ? item.banner.url : imageDefault"
          :tags="item.postTags.map((c) => c.tag.title)"
          :user-avatar="item.user.avatar"
          :user-name="item.user.userName"
          :date-update="new Date(item.dateUpdate)"
          :follow-details="followDetails"
          :user-id="item.user.id"
          @update:follow-details="addFollowDetail($event)"
        >
          />
        </PostComponent>
      </VCol>
      <VCol
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="4"
        xl="3"
        xxl="2"
      >
        <div style="position: -webkit-sticky; position: sticky; top: 100px">
          <VCard
            :title="languageStore.isEn ? 'Category' : 'Danh mục'"
            style="margin-bottom: 20px; border-radius: 15px"
          />
          <VList
            density="compact"
            :items="tags"
            style="
              max-height: 70vh;
              border-top-left-radius: 15px;
              border-bottom-left-radius: 15px;
            "
          />
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>

//#region Imports
import CreateNewPost from "@/views/pages/index/CreateNewPost.vue"
import UserAvatarComponent from "@core/components/UserAvatarComponent.vue"
import {
  useUserStore,
  useOverlayStore,
  useSnakBarStore,
  useLanguageStore,
} from "@/store"
import * as postAPI from "@/api/postAPI"
import { onBeforeMount } from "vue"
import PostComponent from "@/views/pages/index/PostComponent.vue"
import imageDefault from "@images/pages/imageDefault.png"
import * as tagAPI from "@/api/tagAPI"
import * as followDetailAPI from "@/api/followDetailAPI"
import { uploadImage } from "@/utils/cloudinary"
import { useRoute } from "vue-router"
import * as mediaFileAPI from "@/api/mediaFileAPI"
import folderName from "@/enum/folderName"
import getUrlImage from "@/utils/getUrlImage"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()
const languageStore = useLanguageStore()
const userStore = useUserStore()

//#endregion

//#region Variables
const posts = ref([])

const options = ref({
  page: 1,
  itemsPerPage: -1,
  sortBy: [],
  groupBy: [],
  searchOption: {
    searchQuery: "",
  },
})

const tags = ref([])
const followDetails = ref([])

const optionsTag = ref({
  page: 1,
  itemsPerPage: -1,
  sortBy: [],
  groupBy: [],
  searchOption: {
    searchQuery: "",
  },
})

const optionsFollowDetal = ref({
  page: 1,
  itemsPerPage: -1,
  sortBy: [],
  groupBy: [],
  searchOption: {
    searchQuery: "",
    userFromId: userStore.user.id,
  },
})

const dialogCKEditor = ref(false)

//#endregion

//#region Methods
const addFollowDetail = userId => {
  followDetails.value.push(userId)
}

const loadTags = async () => {
  overlayStore.overlayVisible = true

  const response = await tagAPI.getAllTag(optionsTag.value)

  overlayStore.overlayVisible = false
  if (response.statusCode === 200) {
    tags.value = response.data.data.map(c => ({
      title: c.title,
      value: c.id,
    }))
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

const loadFollowDetails = async () => {
  overlayStore.overlayVisible = true

  const response = await followDetailAPI.getAllFollowDetail(
    optionsFollowDetal.value,
  )

  overlayStore.overlayVisible = false
  if (response.statusCode === 200) {
    followDetails.value = response.data.data.map(c => c.userToId)
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

const fetchPosts = async () => {
  overlayStore.overlayVisible = true

  const response = await postAPI.getAllPost(options.value)

  overlayStore.overlayVisible = false
  if (response.statusCode === 200) {
    posts.value = response.data.data
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

const createNewPost = async event => {
  overlayStore.overlayVisible = true

  const image = await mediaFileAPI.addMediaFile(event.banner, folderName.main)

  const response = await postAPI.addPost(
    userStore.user.id,
    event.title,
    event.subTitle,
    event.editorData,
    getUrlImage(image.data.id),
    event.tags,
  )

  overlayStore.overlayVisible = false
  snakBarStore.setSnackBarContent(
    languageStore.isEn ? response.notificationEn : response.notificationVi,
  )
  if (response.statusCode === 200) {
    fetchPosts()
  }
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  await fetchPosts()
  await loadTags()
  await loadFollowDetails()
})

//#endregion

//#region SignalR Setup
//#endregion
</script>
