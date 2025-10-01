<script setup>
import 'normalize.css'
import '~/assets/css/main.scss'
import { joinURL } from 'ufo'
import { getYear } from '~/queries'
import { useMediaQuery } from '@vueuse/core'
const mainTitle = 'TOGGLE'
const router = useRouter()

const currYear = computed(() => {
  return '/' + router.currentRoute.value.params.year
})

const isHome = computed(() => {
  const curr = router.currentRoute.value
  return curr.path === '/'
})

const isYear = computed(() => {
  const curr = router.currentRoute.value
  return curr.matched.length === 1 && curr.matched[0].name === 'year'
})
const currStudent = computed(() => {
  const { student } = router.currentRoute.value.params
  if (!student) return null
  return joinURL(currYear.value, student)
})
const isMobileLayout = useMediaQuery('(max-width: 768px)')

const title = shallowRef(null)
watch(
  isYear,
  (value) => {
    if (!value) {
      title.value = mainTitle
      return
    }
  },
  { immediate: true },
)

provide('app', { title, currStudent, isMobileLayout, isYear, currYear })
</script>

<template lang="pug">
h1.pageTitle(:homepage="isHome")
  LinkButton.pageTitle__return(:to="isYear ? '/' : currYear " icon="uil:arrow-left")
  span(v-text="title")
  div(v-show="false")
NuxtPage
</template>
<style lang="scss">
.pageTitle {
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

  &__return {
    justify-self: end;
    @include transition(opacity);

    [homepage='true'] & {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
