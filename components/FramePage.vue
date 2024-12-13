<script setup>
import { useElementBounding, toReactive, unrefElement } from '@vueuse/core'

const props = defineProps({
  src: String,
  container: Object,
  index: Number,
})
const $cell = ref(null)
const hover = ref(false)
const bounds = toReactive(useElementBounding($cell))
const loaded = ref(false)
const { $frames, frameId } = inject('framify')
const iframe = ref(null)
let animTimer
watchEffect(() => {
  if (!iframe.value) return

  // const style = iframe.value.style
  // // console.log((style.top = '10px'))
  // style.transform = `translate(${bounds.left}px, ${bounds.top}px)`
  // style.width = `${bounds.width}px`
  // style.height = `${bounds.height}px`
})

onBeforeUnmount(() => {
  iframe.value?.setAttribute('mounted', 'false')
  hover.value = false
  clearTimeout(animTimer)
})

onMounted(() => {
  const container = unrefElement($frames)
  iframe.value = container.querySelector(`iframe[src="${props.src}"]`)

  if (!iframe.value) {
    const newFrame = document.createElement('iframe')
    iframe.value = newFrame
    newFrame.src = props.src
    newFrame.dataset.src = props.src
    newFrame.classList.add('framePage-iframe')
    newFrame.setAttribute('loaded', 'false')
    container.appendChild(newFrame)
    iframe.value?.setAttribute('mounted', 'true')
    newFrame.onload = async () => {
      await delay(1000)
      newFrame.setAttribute('loaded', 'true')
    }
  } else {
    animTimer = setTimeout(() => {
      iframe.value?.setAttribute('mounted', 'true')
    }, 300)
  }

  iframe.value.style.display = 'block'
  iframe.value.ontransitionend = () => {
    if (iframe.value.getAttribute('mounted') === 'false') {
      iframe.value.style.display = 'none'
    }
  }

  iframe.value.style.order = props.index
  iframe.value.onmouseenter = () => {
    hover.value = true
  }
  iframe.value.onmouseleave = () => {
    hover.value = false
  }
})
</script>
<template lang="pug">
.framePage(ref="$cell" :hover)
  .framePage-overlay
    slot
  //- iframe.framePage-iframe(:loaded :src @load="loaded = true")
</template>
<style lang="scss">
.framePage {
  position: relative;
  pointer-events: none;

  &-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    padding: $gap-small;
    z-index: 1;
    opacity: 0;
    display: flex;
    align-items: flex-start;
    transform: scale(0.9);
    justify-content: flex-end;
    gap: $gap-small;

    @include transition(opacity, transform);

    @mixin visible {
      opacity: 1;
      transform: scale(1);
    }

    :hover > &,
    [hover='true'] > & {
      @include visible;
    }

    @include layout-mobile {
      @include visible;
    }

    > * {
      pointer-events: auto;
    }
  }

  &-iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: $gap-small;

    @include transition(opacity);

    @include layout-mobile {
      transition-duration: 50ms;
    }

    &[loaded='false'],
    &[mounted='false'] {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
