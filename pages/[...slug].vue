<script setup>
import { getPage } from '~/queries'

const items = ref([])

const route = useRoute()
const { data, error } = await useKql(getPage(route.path))

if (!data.value.result) {
  await navigateTo('/')
}

onMounted(() => {
  const links = []
  const { webfolders } = data.value.result

  webfolders.forEach((file) => {
    links.push(file)
  })

  items.value = links
})
</script>

<template lang="pug">
Framify.page(v-if="items.length" :items)
</template>
<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}
</style>
