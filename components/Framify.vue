<script setup>
const props = defineProps({
  items: Array,
})
const $elem = ref(null)
onMounted(() => {
  const urls = props.items.map((item) => {
    return item.url
  })

  window.framify(urls, { parent: unref($elem) })
})
</script>

<template lang="pug">
.framifyContainer(ref="$elem")
</template>
<style lang="scss">
.frameifyContainer {
  position: relative;
}
</style>
