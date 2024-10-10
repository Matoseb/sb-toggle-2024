<script setup lang="ts">
import '~/assets/css/main.scss'

const { framify } = await import(
  /* vite-ignore */ 'https://unpkg.com/@matoseb/uselottie/build/bundle/index.js'
)

useHead({
  // title: 'TOGGLE 2024',
  titleTemplate: (value) => {
    const title = 'TOGGLE 2024'
    return value ? `${value} | ${title}` : title
  },
})

window.framify = framify
</script>

<template>
  <NuxtPage />
</template>
