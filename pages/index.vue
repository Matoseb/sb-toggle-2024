<script setup>
import { getSite } from '~/queries'

const $index = ref(null)
const { data, error } = await useKql(getSite())
const items = ref([])
// useHead({
//   title: 'Home',
//   script: [
//     {
//       type: 'module',
//       src: 'https://unpkg.com/@matoseb/uselottie/build/bundle/index.js',
//       onload: () => {
//         console.log('loaded')
//       },
//     },
//   ],
// })

onMounted(() => {
  const links = []
  const { children } = data.value.result

  children.forEach((page) => {
    page.webfolders.forEach((file) => {
      // console.log(page.title, file);
      links.push(file)
    })
  })

  items.value = shuffle(links)
})
</script>

<template lang="pug">
Framify.page(v-if="items.length" ref="$index" :items)
</template>
<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}
</style>
