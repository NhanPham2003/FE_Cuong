<script setup>

//#region Imports
import ChatComponent from "./ChatComponent.vue"
import { useChatStore } from "@/store"

//#endregion

//#region Props
//#endregion

//#region Emits
//#endregion

//#region Use Stores
const chatStore = useChatStore()

//#endregion

//#region Variables
//#endregion

//#region Methods
//#endregion

//#region Hooks
//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <div class="chat-container-component">
    <ChatComponent
      v-for="item in chatStore.chatBox"
      :id="item.id"
      :key="item.id"
    />
  </div>
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
