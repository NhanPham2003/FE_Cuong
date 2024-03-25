<script setup>

//#region Imports
import { requiredValidator } from "@validators"
import { useOverlayStore, useSnakBarStore, useLanguageStore } from "@/store"

//#endregion

//#region Props
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

//#endregion

//#region Emits
const emit = defineEmits(["update:isDialogVisible"])

//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const snakBarStore = useSnakBarStore()

//#endregion

//#region Variables
const title = ref("")
const userChatBoxes = ref([])
const refForm = ref()
const isFormValid = ref(false)

//#endregion

//#region Methods
const closeDialog = () => {
  emit("update:isDialogVisible", false)
}

const addGroupChat = async () => {
  emit("update:isDialogVisible", false)
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      await addGroupChat()
    }
  })
}

const dialogModelValueUpdate = val => {
  emit("update:isDialogVisible", true)
}

//#endregion

//#region Hooks
//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="600"
    max-height="600"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <!-- Dialog Content -->
    <VCard
      :title="languageStore.isEn ? 'User Profile' : 'Thông tin người dùng'"
      style="border-radius: 20px"
    >
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="title"
                :rules="[requiredValidator]"
                autofocus
                :label="languageStore.isEn ? 'Group name' : 'Tên nhóm'"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn
            variant="tonal"
            color="secondary"
            @click="closeDialog"
          >
            {{ languageStore.isEn ? "Close" : "Đóng" }}
          </VBtn>
          <VBtn type="submit">
            {{ languageStore.isEn ? "Save" : "Lưu" }}
          </VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>
