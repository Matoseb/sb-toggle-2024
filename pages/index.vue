<script setup>
onMounted(async () => {})
import { ROOT_SLUGS } from '~/queries'
</script>

<template lang="pug">
ul.pageIndex
  li(v-for="(value, year) in ROOT_SLUGS" :key="year")
    NuxtLink(:to="`/${year}`" v-text="year")
</template>
<style lang="scss">
.pageIndex {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;

  li {
    padding: 0.5rem 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
