<!-- https://icones.js.org/collection/uil?s=plus -->

<script setup>
const props = defineProps({
  icon: String,
  external: { type: Boolean, default: false },
})

const external = computed(() => {
  return props.external
    ? { target: '_blank', rel: 'noopener', external: true }
    : {}
})
</script>
<template lang="pug">
NuxtLink.linkButton.flex-center.btn-hover(
  v-bind="external"
)
  Icon(:name="icon")
</template>
<style lang="scss">
.linkButton {
  width: $gap * 2;
  border-radius: 50%;
  aspect-ratio: 1;
}
</style>
