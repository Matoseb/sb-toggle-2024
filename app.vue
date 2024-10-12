<script setup lang="ts">
import 'normalize.css'
import '~/assets/css/main.scss'
import { getSite } from '~/queries'

const $index = ref(null)
const router = useRouter()
const { data, error } = await useKql(getSite())
const result = useResult(data, error)
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
    const title = result.value.title
    return value ? `${value} | ${title}` : title
  },
})

window.framify = framify

onMounted(() => {
  const links = []
  const { children } = result.value

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
  //- v-show="isHome"
  Framify.pageFramify(
    v-if="initialized && items.length && isHome"
    ref="$index"
    :items
    :animate="true"
    :interval="[3000, 5000]"
  )
  NuxtPage
</template>
<style lang="scss">
.pageFramify {
  width: 100%;

  .framify__cell {
    box-shadow: none !important;
    z-index: 1;
    max-width: 12rem;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
  .framify__row {
    gap: 2rem;
  }
}
</style>
