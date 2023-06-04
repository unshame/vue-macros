<script setup lang="ts">
import { ref } from 'vue'

export const foo = ref<string>('foo')
export const bar = ref(10)
export const qux = ref(fn())

function fn() {}
</script>
