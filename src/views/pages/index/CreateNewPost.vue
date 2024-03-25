<script setup>

//#region Imports
import ClassicEditor from "@/plugins/ckeditor"
import { useTheme } from "vuetify"
import AppTextField from "@/@core/components/app-form-elements/AppTextField.vue"
import imageDefault from "@images/pages/imageDefault.png"
import { requiredValidator } from "@validators"
import { useOverlayStore, useLanguageStore } from "@/store"

//#endregion

//#region Props
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
})

//#endregion

//#region Emits
const emit = defineEmits(["update:isDialogVisible", "confirm"])

//#endregion

//#region Use Stores
const languageStore = useLanguageStore()
const overlayStore = useOverlayStore()
const vuetifyTheme = useTheme()

//#endregion

//#region Variables
const title = ref("")
const subTitle = ref("")
const banner = ref(imageDefault)
const bannerShow = ref(imageDefault)
const tagSelect = ref([])
const editor = ClassicEditor
const editorData = ref("")
const editorConfig = {}
const refForm = ref()
const fileInput = ref()
const isFormValid = ref(false)

//#endregion

//#region Methods
const updateModelValue = val => {
  emit("update:isDialogVisible", val)
}

const createNewPost = async () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      const data = {
        editorData: editorData.value,
        title: title.value,
        subTitle: subTitle.value,
        banner: banner.value,
        tags: tagSelect.value,
      }

      emit("confirm", data)
      editorData.value = ""
      title.value = ""
      subTitle.value = ""
      banner.value = imageDefault
      bannerShow.value = imageDefault
      emit("update:isDialogVisible", false)
    }
  })
}

const closeDialog = () => {
  emit("update:isDialogVisible", false)
}

const uploadBanner = () => {
  fileInput.value.click()
}

const uploadImageInput = async event => {
  overlayStore.overlayVisible = true
  banner.value = event.target.files[0]
  bannerShow.value = await handleImageFile(event.target.files[0])
  overlayStore.overlayVisible = false
}

const handleImageFile = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

//#endregion

//#region Hooks
onBeforeMount(() => {
  if (vuetifyTheme.global.name.value === "dark") {
    document.documentElement.style.setProperty(
      "--create-new-post-color",
      "white",
    )
    document.documentElement.style.setProperty(
      "--ck-color-button-default-hover-background",
      "#53566B",
    )
    document.documentElement.style.setProperty(
      "--ck-color-button-on-background",
      "#53566B",
    )
    document.documentElement.style.setProperty(
      "--ck-color-dropdown-panel-background",
      "#53566B",
    )
  } else {
    document.documentElement.style.setProperty(
      "--create-new-post-color",
      "black",
    )
    document.documentElement.style.setProperty(
      "--ck-color-button-default-hover-background",
      "#D4D7DF",
    )
    document.documentElement.style.setProperty(
      "--ck-color-button-on-background",
      "#D4D7DF",
    )
    document.documentElement.style.setProperty(
      "--ck-color-dropdown-panel-background",
      "#D4D7DF",
    )
  }
})

//#endregion

//#region SignalR Setup
//#endregion
</script>

<template>
  <!-- 👉 Confirm Dialog -->
  <VDialog
    :model-value="props.isDialogVisible"
    fullscreen
    @update:model-value="updateModelValue"
  >
    <VCard :title="languageStore.isEn ? 'Create new post' : 'Tạo bài viết mới'">
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="createNewPost"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VImg
                :src="bannerShow"
                width="200"
                style="cursor: pointer"
                @click="uploadBanner"
              />
              <VFileInput
                ref="fileInput"
                :multiple="false"
                accept="image/*"
                style="display: none"
                :rules="[requiredValidator]"
                @change="uploadImageInput"
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="title"
                :label="languageStore.isEn ? 'Title' : 'Tiêu đề'"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="6">
              <AppSelect
                v-model="tagSelect"
                :label="languageStore.isEn ? 'Tag' : 'Tag'"
                :items="props.tags"
                item-title="title"
                item-value="value"
                chips
                multiple
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="subTitle"
                :label="languageStore.isEn ? 'Sub title' : 'Mô tả'"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <div id="create-new-post">
                <Ckeditor
                  v-model="editorData"
                  :editor="editor"
                  :config="editorConfig"
                />
              </div>
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

<style>
:root {
  --ck-border-radius: 10px;
  --ck-color-base-background: 0;
}

#create-new-post * {
  color: var(--create-new-post-color);
}
</style>
