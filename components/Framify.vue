<script setup>
const props = defineProps({
  items: Array,
})
const $elem = ref(null)
useInternalLinks($elem)

onMounted(() => {
  const urls = props.items.map((item) => {
    return item.url
  })

  window.framify(urls, { parent: unref($elem) })
  unrefElement($elem)
    .querySelectorAll('iframe')
    .forEach((iframe, index) => {
      const a = iframe.closest('.framify__cell').querySelector('a')
      const pageLink = props.items[index].page?.url
      if (!pageLink) return
      const path = new URL(pageLink).pathname
      a.href = path
      a.removeAttribute('target')
      a.innerHTML = textVariant('⤴')
      a.innerHTML = '↪'
      a.classList.add('topage')
    })
})
</script>

<template lang="pug">
.framifyContainer(ref="$elem")
</template>
<style lang="scss">
.framifyContainer {
  display: flex;
  align-items: center;
}
</style>
