<script setup lang="ts">
import 'normalize.css'
import '~/assets/css/main.scss'
import { getSite } from '~/queries'
import { useMediaQuery } from '@vueuse/core'

const $index = ref(null)
const router = useRouter()
const { data, error } = await useKql(getSite())
const result = useResult(data, error)
const items = ref([])
const initialized = ref(false)
const isHome = computed(() => {
  return router.currentRoute.value.path === '/'
})

const isMobileLayout = useMediaQuery('(max-width: 768px)')

const title = ref('TOGGLE')
watch(
  isHome,
  (value) => {
    if (!value) return
    title.value = result.value.title
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

// window.framify = framify

onMounted(() => {
  const links = []
  const { children } = result.value

  children.forEach((page) => {
    page.webfolders.forEach((file) => {
      links.push({ src: file.url, page })
    })
  })

  items.value = shuffle(links)
})

const currStudent = computed(() => {
  const { student = [] } = router.currentRoute.value.params
  if (student.length > 1) return
  return student[0]
})

const filteredItems = computed(() => {
  // console.log(router.currentRoute.value)
  if (!currStudent.value) return items.value

  // return items.value
  const selected = items.value.filter((item) => {
    return item.page.slug === currStudent.value
  })
  return selected
})

provide('app', { title, currStudent, isMobileLayout })

async function handleClick(event) {
  if (!currStudent.value) return
  if (event.target.closest('.framify__cell')) return
  await navigateTo('/')
}
</script>

<template lang="pug">
.page(:homepage="isHome" :is-mobile="isMobileLayout")
  h1.page-title
    LinkButton.page-return(:to="'/'" icon="uil:arrow-left")
    span(v-text="title")
    div(v-show="false")
  Framify.page-framify(
    v-if="items.length"
    ref="$index"
    :items="filteredItems"
    :animate="false"
    :interval="[3000, 5000]"
    @click="handleClick"
  )
    template(#default="{ item }")
      LinkButton(:to="item.page.slug" icon="uil:eye" v-if="!currStudent")
      LinkButton(:to="item.src" external icon="uil:external-link-alt" v-if="currStudent === item.page.slug")
  NuxtPage
</template>
<style lang="scss">
.page {
  display: contents;

  &-return {
    justify-self: end;
    @include transition(opacity);

    [homepage='true'] & {
      opacity: 0;
      pointer-events: none;
    }
  }

  &-title {
    position: sticky;
    top: 0;
    margin: 0;
    padding: $gap;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 70%,
      rgba(255, 255, 255, 0.1) 95%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
    font-size: inherit;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: $gap;
  }

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
