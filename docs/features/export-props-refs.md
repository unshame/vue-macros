# exportProps

<StabilityLevel level="experimental" />

Declaring props as exported `ref`s for Vue.

|   Features   |     Supported      |
| :----------: | :----------------: |
|    Vue 3     | :white_check_mark: |
|    Nuxt 3    |         ?          |
|    Vue 2     |         ?          |
| Volar Plugin | :white_check_mark: |

## Usage

Using export syntax to declare props as `ref`s.
Uses `toRefs` instead of [reactive props destructuring](https://vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure)
under the hood.

```vue
<script setup lang='ts'>
import { ref } from 'vue'

export const foo = ref<string>()
export const bar = ref<number>(1) // with default value

console.log(foo.value, bar.value)
</script>
```
