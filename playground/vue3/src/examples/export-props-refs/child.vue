<!-- eslint-disable import/no-mutable-exports -->
<!-- eslint-disable @typescript-eslint/no-inferrable-types -->
<script setup lang="ts">
import { ref } from 'vue'

export const foo = ref<string>()
export const bar = ref<number>(10)

const check = () => {
  console.log(foo.value, bar.value)
  debugger
}
</script>

<template>
  <div>exportProps <button @click="check">Check source map</button></div>
  <div>foo: {{ foo }}</div>
  <div>bar: {{ bar }}</div>
</template>
