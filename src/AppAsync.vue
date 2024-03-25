<template>
  <Suspense>
    <template #default>
      <App />
    </template>

    <template #fallback>
      <VOverlay
        v-model="loading"
        persistent
        class="align-center justify-center"
      >
        <VImg
          width="100"
          :src="giphy"
        />
      </VOverlay>
    </template>
  </Suspense>
</template>

<script setup>
import App from "./App.vue"
import giphy from "@images/gif/giphy.gif"

const loading = true
</script>