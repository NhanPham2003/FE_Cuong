<template>
  <!-- 👉 Export button -->
  <VBtn
    variant="tonal"
    color="secondary"
    prepend-icon="tabler-screen-share"
    @click="exportData"
  >
    {{ languageStore.isEn ? "Export" : "Xuất" }}
  </VBtn>
</template>

<script setup>
import { jsonToFileExport } from "@/utils/exportData"
import { useLanguageStore } from "@/store"

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  headersExport: {
    type: Object,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  functionConvert: {
    type: Function,
    required: true,
  },
})

const languageStore = useLanguageStore()

const exportData = () => {
  jsonToFileExport(
    props.functionConvert(props.data),
    props.fileName,
    props.headersExport,
  )
}
</script>