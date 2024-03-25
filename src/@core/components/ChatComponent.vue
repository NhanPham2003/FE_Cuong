<script setup>

//#region Imports
import {
  useChatStore,
  useUserStore,
  useSnakBarStore,
  useLanguageStore,
} from "@/store"
import UserAvatarComponent from "./UserAvatarComponent.vue"
import signalR from "@/signalR/signalR"
import * as messageAPI from "@/api/messageAPI"
import { onBeforeMount, nextTick } from "vue"
import dayjs from "dayjs"
import AppTextField from "./app-form-elements/AppTextField.vue"

//#endregion

//#region Props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

//#endregion

//#region Emits
//#endregion

//#region Use Stores
const chatStore = useChatStore()
const userStore = useUserStore()
const snakBarStore = useSnakBarStore()
const languageStore = useLanguageStore()

//#endregion

//#region Variables
const message = ref("")
const messages = ref([])
const chatBox = chatStore.chatBox.find(c => c.id === props.id)
const isTyping = ref(false)
const messagesContainer = ref()
const loadingMessages = ref(false)
const maxLoad = ref(0)

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [
    {
      key: "time",
      order: "desc",
    },
  ],
  groupBy: [],
  searchOption: {
    searchQuery: "",
    chatBoxId: props.id,
  },
})

//#endregion

//#region Methods
const typing = async chatBoxId => {
  await signalR.sendMessage("typing", {
    from: userStore.user.userName,
    chatBoxId: chatBoxId,
  })
}

const loadMessages = async () => {
  loadingMessages.value = true

  const response = await messageAPI.getAllMessage(options.value)

  loadingMessages.value = false
  if (response.statusCode === 200) {
    messages.value.push(...response.data.data.reverse(), ...messages.value)
    maxLoad.value = response.data.totalPage
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

const infiniteScroll = async () => {
  if (
    messagesContainer.value.scrollTop === 0 &&
    options.value.page + 1 <= maxLoad.value
  ) {
    options.value.page += 1
    await loadMessages()
  }
}

const sendMessage = async () => {
  if (message.value == "") {
    return
  }

  options.value.page = 1

  const response = await messageAPI.addMessage(
    message.value,
    chatBox.userChatBoxes.find(c => c.userId === userStore.user.id).id,
  )

  if (response.statusCode === 200) {
    message.value = ""
    await signalR.sendMessage("renewMessage", {
      messages: options.value,
    })
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  await loadMessages()
  nextTick(() => {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
})

//#endregion

//#region SignalR Setup
signalR.onReceiveMessage("typing", data => {
  isTyping.value = true

  setTimeout(() => {
    isTyping.value = false
  }, 600)
})

signalR.onReceiveMessage("renewMessage", data => {
  message.value = []
  if (data.messages.searchOption.chatBoxId === props.id) {
    messages.value = data.messages.data.reverse()
    maxLoad.value = data.messages.totalPage
    nextTick(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    })
  }
})

//#endregion
</script>

<template>
  <VCard
    style="
      width: 320px;
      height: 450px;
      padding: 10px;
      border: 1px solid;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
    "
  >
    <div style="display: flex; justify-content: space-between; align-items: center">
      <div
        style="
          display: flex;
          justify-content: start;
          align-items: center;
          cursor: pointer;
        "
      >
        <UserAvatarComponent
          v-if="!chatBox.isGroup"
          :avatar="
            chatBox.userChatBoxes.find((c) => c.userId !== userStore.user.id)
              .user.avatar
          "
          :user-name="
            chatBox.userChatBoxes.find((c) => c.userId !== userStore.user.id)
              .user.userName
          "
          :size="35"
          is-show-v-bsdge
        />
        <UserAvatarComponent
          v-else
          :avatar="null"
          :user-name="chatBox.title"
          :size="35"
          is-show-v-bsdge
        />
        <div
          style="
            margin-left: 10px;
            display: flex;
            justify-content: start;
            align-items: center;
          "
        >
          <div>
            <p
              v-if="!chatBox.isGroup"
              style="margin: 0; font-weight: 600"
            >
              {{
                chatBox.userChatBoxes.find(
                  (c) => c.userId !== userStore.user.id
                ).bietDanh
                  ? chatBox.userChatBoxes.find(
                    (c) => c.userId !== userStore.user.id
                  ).bietDanh
                  : chatBox.userChatBoxes.find(
                    (c) => c.userId !== userStore.user.id
                  ).user.userName
              }}
            </p>
            <p
              v-else
              style="margin: 0; font-weight: 600; font-size: smaller"
            >
              {{ chatBox.title }}
            </p>
          </div>
        </div>
      </div>
      <VIcon
        icon="tabler-x"
        style="cursor: pointer"
        @click="
          chatStore.chatBox = chatStore.chatBox.filter(
            (c) => c.id !== chatBox.id
          )
        "
      />
    </div>
    <div
      v-if="!loadingMessages"
      ref="messagesContainer"
      style="flex-grow: 1; margin-top: 10px; overflow-y: auto"
      @scroll="infiniteScroll"
    >
      <div
        v-for="item in messages"
        :key="item.id"
      >
        <div
          v-if="item.userChatBox.userId === userStore.user.id"
          style="
            display: flex;
            justify-content: end;
            align-items: flex-end;
            gap: 10px;
            margin-top: 15px;
          "
        >
          <div style="max-width: 70%">
            <p style="font-size: 12px; text-align: end; margin: 0">
              {{
                dayjs(item.time)
                  .locale(languageStore.isEn ? "en" : "vi")
                  .fromNow()
              }}
            </p>
            <VCard
              style="padding: 10px; width: 100%; white-space: pre-wrap"
              color="primary"
            >
              {{ item.msg }}
            </VCard>
          </div>
          <UserAvatarComponent
            :avatar="item.userChatBox.user.avatar"
            :user-name="item.userChatBox.user.userName"
            :size="30"
            is-show-v-bsdge
          />
        </div>
        <div
          v-else
          style="
            display: flex;
            justify-content: start;
            align-items: flex-end;
            gap: 10px;
            margin-top: 15px;
          "
        >
          <UserAvatarComponent
            :avatar="item.userChatBox.user.avatar"
            :user-name="item.userChatBox.user.userName"
            :size="30"
            is-show-v-bsdge
          />
          <div style="max-width: 70%">
            <p style="font-size: 12px; text-align: start; margin: 0">
              {{
                dayjs(item.time)
                  .locale(languageStore.isEn ? "en" : "vi")
                  .fromNow()
              }}
            </p>
            <VCard
              style="padding: 10px; width: 100%; white-space: pre-wrap"
              color="primary"
            >
              {{ item.msg }}
            </VCard>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      style="
        flex-grow: 1;
        margin-top: 10px;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <VProgressCircular
        indeterminate
        color="primary"
      />
    </div>
    <div>
      <img
        v-if="isTyping"
        src="../../assets/images/gif/typing.gif"
        style="height: 15px; margin-top: 10px"
      >
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 5px;
      "
    >
      <AppTextField
        v-model="message"
        rows="1"
        @input="typing(chatBox.id)"
        @keyup.enter="sendMessage"
      />
      <VIcon
        icon="tabler-send"
        style="cursor: pointer"
        @click="sendMessage"
      />
    </div>
  </VCard>
</template>

<style lang="scss">
.chat-container-component {
  position: fixed !important;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
}
</style>
