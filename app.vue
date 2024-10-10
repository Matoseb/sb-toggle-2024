<script setup lang="ts">
import '~/assets/css/main.scss'

const { framify } = await import(
  /* vite-ignore */ 'https://unpkg.com/@matoseb/uselottie/build/bundle/index.js'
)

window.framify = framify
</script>

<template>
  <NuxtPage />
</template>
