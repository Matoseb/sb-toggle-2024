<script setup>
import { getYear } from '~/queries'

import { joinURL } from 'ufo'
const $index = ref(null)
const router = useRouter()

const { data, error } = await useKql(
  getYear(router.currentRoute.value.params.year),
)
const result = useResult(data, error)
const items = ref([])
const itemsShuffled = ref([])

const initialized = ref(false)

const { isYear, currStudent, isMobileLayout, currYear, title } = inject('app')

useHead({
  // title: 'TOGGLE 2024',
  titleTemplate: (value) => {
    const title = result.value.title
    return value ? `${value} | ${title}` : title
  },
})

// window.framify = framify

onMounted(() => {
  let links = []
  const { children } = result.value

  children.forEach((page) => {
    const slug = joinURL(currYear.value, page.slug)
    page.webfolders.forEach((file) => {
      links.push({ src: file.url, page, file, slug })
    })
  })
  // links = links.slice(0, 10)
  items.value = links
  itemsShuffled.value = shuffle(links)
})

const filteredItems = computed(() => {
  // console.log(router.currentRoute.value)
  if (!currStudent.value) return itemsShuffled.value

  // return items.value
  const selected = items.value.filter((item) => {
    return item.slug === currStudent.value
  })
  return selected
})

async function handleClick(event) {
  if (!currStudent.value) return
  if (event.target.closest('.framify__cell')) return
  await navigateTo(currYear.value)
}

watch(
  isYear,
  (value) => {
    if (!value) {
      return
    }
    title.value = result.value.title
  },
  { immediate: true },
)

definePageMeta({
  key: (route) => {
    return route.params.year
  },
})
</script>

<template lang="pug">
.page(:is-mobile="isMobileLayout")
  Framify.page-framify(
    v-if="items.length"
    ref="$index"
    :items="filteredItems"
    :animate="false"
    :interval="[3000, 5000]"
    @click="handleClick"
  )
    template(#default="{ item }")
      LinkButton(:to="item.slug" icon="uil:eye" v-if="!currStudent")
      LinkButton(:to="item.src" external icon="uil:external-link-alt" v-if="currStudent === item.slug")
  NuxtPage
</template>
<style lang="scss">
.page {
  display: contents;

  &-framify {
    width: 100%;
    padding: $gap;
    margin: auto 0;

    // .framify__cell {
    //   box-shadow: none !important;
    //   z-index: 1;
    //   max-width: 12rem;

    //   @media (max-width: 768px) {
    //     max-width: 100%;
    //   }
    // }
    // .framify__row {
    //   gap: 2rem;
  }
}
</style>
