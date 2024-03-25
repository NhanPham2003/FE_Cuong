<template>
  <div>
    <CreateNeGroupChat
      :is-dialog-visible="showCreateNewGroup"
      @update:is-dialog-visible="showCreateNewGroup =$event"
    />
    <VMenu
      location="bottom center"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <IconBtn
          v-bind="props"
          style="margin-right: 10px"
        >
          <VIcon
            icon="tabler-message-2"
            :size="26"
          />
        </IconBtn>
      </template>

      <VCard
        min-width="400"
        max-height="500"
        style="margin-top: 10px; border-radius: 15px"
      >
        <VCardText style="padding-bottom: 10px; display: flex; justify-content: end;">
          <IconBtn
            style="margin-right: 10px"
            @click="showCreateNewGroup = true"
          >
            <VIcon
              icon="tabler-square-plus"
              :size="26"
            />
          </IconBtn>
        </VCardText>
        <VCardText>
          <VTabs v-model="currentTab">
            <VTab>{{ languageStore.isEn ? "Conversations" : "Trò chuyện" }}</VTab>
            <VTab>{{ languageStore.isEn ? "Groups" : "Nhóm" }}</VTab>
          </VTabs>
          <div v-if="!loading">
            <VList v-if="(currentTab === 0 ? chatBoxs : groups).length > 0">
              <VListItem
                v-for="item in currentTab === 0 ? chatBoxs : groups"
                :key="item.id"
                @click="addChatBox(item)"
              >
                <div
                  style="
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  cursor: pointer;
                "
                >
                  <UserAvatarComponent
                    v-if="currentTab === 0"
                    :avatar="
                      item.userChatBoxes.find(
                        (c) => c.userId !== userStore.user.id
                      ).user.avatar
                    "
                    :user-name="
                      item.userChatBoxes.find(
                        (c) => c.userId !== userStore.user.id
                      ).user.userName
                    "
                    :size="45"
                    is-show-v-bsdge
                  />
                  <UserAvatarComponent
                    v-else
                    :avatar="null"
                    :user-name="item.title"
                    :size="45"
                    is-show-v-bsdge
                  />
                  <div
                    style="
                    margin-left: 20px;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                  "
                  >
                    <div>
                      <p
                        v-if="currentTab === 0"
                        style="margin: 0; font-weight: 600"
                      >
                        {{
                          item.userChatBoxes.find(
                            (c) => c.userId !== userStore.user.id
                          ).bietDanh
                            ? item.userChatBoxes.find(
                              (c) => c.userId !== userStore.user.id
                            ).bietDanh
                            : item.userChatBoxes.find(
                              (c) => c.userId !== userStore.user.id
                            ).user.userName
                        }}
                      </p>
                      <p
                        v-else
                        style="margin: 0; font-weight: 600"
                      >
                        {{ item.title }}
                      </p>
                      <p style="margin: 0">
                        {{ item.message?item.message.msg:languageStore.isEn ? "No messages" : "Không có tin nhắn" }}
                      </p>
                    </div>
                  </div>
                </div>
              </VListItem>
            </VList>
            <div
              v-else
              style="padding: 20px; text-align: center"
            >
              {{ languageStore.isEn ? "No content" : "Không có nội dung" }}
            </div>
          </div>
          <div
            v-else
            style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
          "
          >
            <VProgressCircular
              indeterminate
              color="primary"
            />
          </div>
        </VCardText>
      </VCard>
    </VMenu>
  </div>
</template>

<script setup>

//#region Imports
import { onBeforeMount, ref } from "vue"
import * as chatBoxAPI from "@/api/chatBoxAPI"
import {
  useUserStore,
  useSnakBarStore,
  useLanguageStore,
  useChatStore,
} from "@/store"
import UserAvatarComponent from "@core/components/UserAvatarComponent.vue"
import CreateNeGroupChat from "./CreateNeGroupChat.vue"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const snakBarStore = useSnakBarStore()
const languageStore = useLanguageStore()
const userStore = useUserStore()
const chatStore = useChatStore()
const loading = ref(false)
const showCreateNewGroup = ref(false)

//#endregion

//#region Variables
const chatBoxs = ref([])
const groups = ref([])
const currentTab = ref(0)

//#endregion

//#region Methods
const addChatBox = item => {
  if (chatStore.chatBox.find(c => c.id == item.id) == null) {
    if(chatStore.chatBox.length === 5)
    {
      chatStore.chatBox.shift() 
    }
    chatStore.chatBox.push(item) 
  }
}

const loadChatBoxs = async () => {
  loading.value = true

  const response = await chatBoxAPI.chatBoxForUser(userStore.user.id)

  loading.value = false
  if (response.statusCode === 200) {
    chatBoxs.value = response.data.filter(c => !c.isGroup)
    groups.value = response.data.filter(c => c.isGroup)
  } else {
    snakBarStore.setSnackBarContent(
      languageStore.isEn ? response.notificationEn : response.notificationVi,
    )
  }
}

//#endregion

//#region Hooks
onBeforeMount(async () => {
  await loadChatBoxs()
})

//#endregion

//#region SignalR Setup
//#endregion
</script>
