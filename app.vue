<script setup lang="ts">
import 'normalize.css'
import '~/assets/css/main.scss'
import { getSite } from '~/queries'

const $index = ref(null)
const router = useRouter()
const { data, error } = await useKql(getSite())
const items = ref([])
const { framify } = await import(
  /* vite-ignore */ 'https://unpkg.com/@matoseb/uselottie/build/bundle/index.js'
)

const initialized = ref(false)
const isHome = computed(() => {
  return router.currentRoute.value.path === '/'
})

watch(
  isHome,
  (value) => {
    if (value) initialized.value = true
  },
  { immediate: true },
)

useHead({
  // title: 'TOGGLE 2024',
  titleTemplate: (value) => {
    const title = 'TOGGLE 2024'
    return value ? `${value} | ${title}` : title
  },
})

window.framify = framify

onMounted(() => {
  const links = []
  const { children } = data.value.result

  children.forEach((page) => {
    page.webfolders.forEach((file) => {
      // console.log(page.title, file);
      links.push({ url: file.url, page })
    })
  })

  items.value = shuffle(links)
})
</script>

<template lang="pug">
  Framify.page(
    v-show="isHome"
    v-if="initialized && items.length"
    ref="$index" :items
  )
  NuxtPage
</template>
