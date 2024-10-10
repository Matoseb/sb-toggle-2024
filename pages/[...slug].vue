<script setup>
import { getPage } from '~/queries'

const items = ref([])

const route = useRoute()
const { data, error } = await useKql(getPage(route.path))

const result = useResult(data, error)

if (!result.value) {
  await navigateTo('/')
}

useHead({
  title: result.value?.title,
})

onMounted(() => {
  const links = []
  const { webfolders } = result.value

  webfolders.forEach((file) => {
    links.push(file)
  })

  items.value = links
})
</script>

<template lang="pug">
.pageTop
  .pageTop__head
    NuxtLink.pageTop__return(to="/") {{('↩')}}
    h2 {{result.title}}
    span
  Framify.pageTop__frames(v-if="items.length" :items)
</template>
<style lang="scss">
.pageTop {
  z-index: 1000;
  position: relative;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  top: 0;

  &__frames {
    width: 100%;
    top: 0;
    flex: 1 1 auto;
  }

  &__head {
    position: sticky !important;
    top: 0;
    left: 0;
    width: 100%;
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    background-color: #fff;
    z-index: 100;

    // sticky margin

    h2 {
      text-align: center;
      font-size: 1rem;
      text-transform: uppercase;
    }
  }

  &__return {
    text-decoration: none;
    padding: 1rem;
    font-size: 1.5rem;
    color: black;
    transition: color 0.3s;

    &:hover {
      color: hsl(212, 100%, 76%);
    }
  }
}
</style>
