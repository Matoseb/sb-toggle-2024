<script></script>

<script setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useRafFn } from '@vueuse/core'
import { animateFrames } from '~/scripts/autoanimate'
// import '~/scripts/animator'
// monkey patch Animation.addEventListeners

const [$elem, setEnabled] = useAutoAnimate({
  update: (el) => {
    console.log('BRO')
  },
})
const $frames = ref(null)
const props = defineProps({
  items: Array,
  animate: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Array,
    default: [3000, 6000],
  },
})

const frameId = useId()
const { isMobileLayout } = inject('app')
provide('framify', { $frames, frameId })

const router = useRouter()
useInternalLinks($elem)

onMounted(() => {
  watchEffect(() => {
    setEnabled(!isMobileLayout.value)
  })

  const cellContainer = unrefElement($elem)
  const { pause, resume } = useRafFn(() => {
    unrefElement($frames)
      .querySelectorAll('iframe')
      .forEach((iframe, index) => {
        const refEl = cellContainer.querySelector(
          `.framify__cell[data-src="${iframe.dataset.src}"]`,
        )
        if (!refEl) return
        if (iframe.getAttribute('mounted') === 'false') return

        if (isMobileLayout.value) {
          iframe.style.removeProperty('transform')
          iframe.style.removeProperty('width')
          // iframe.style.removeProperty('height')
          iframe.style.height = refEl.offsetHeight + 'px'
          return
        }

        const bounds = refEl.getBoundingClientRect()
        const style = iframe.style
        style.transform = `translate(${bounds.left}px, ${bounds.top}px)`
        style.width = `${bounds.width}px`
        style.height = `${bounds.height}px`
      })
  })
  console.log(props.items)
})
</script>

<template lang="pug">
.framify
  .framify__iframes(ref="$frames" :id="frameId")
  .framify__cells(
    ref="$elem"
  )
    template(v-for="(item, index) in items" :key="item.src")
      FramePage.framify__cell(
        :src="item.src"
        :data-src="item.src"
        :data-title="item.file.title"
        :index
      )
        //- v-show="itemFilter(item)"
        slot(:item)
</template>
<style lang="scss">
.framify {
  // display: flex;
  pointer-events: auto;
  position: relative;

  &__cells {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    align-items: center;
    gap: $gap 0;
  }

  &__iframes {
    position: fixed;
    inset: 0;
    z-index: 1;

    @include layout-mobile {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: $gap 0;
      padding: $gap;
    }

    [homepage='false'] & {
      cursor: w-resize;
    }

    > iframe {
      position: absolute;
      pointer-events: auto;
      will-change: transform, opacity;

      @include layout-mobile {
        position: relative;
      }
    }
  }

  &__cell {
    // outline: 1px solid red;
    max-width: 12rem;
    width: 100%;
    overflow: hidden;
    aspect-ratio: 1;

    @include layout-mobile {
      max-width: 100%;
    }
  }
}
</style>
