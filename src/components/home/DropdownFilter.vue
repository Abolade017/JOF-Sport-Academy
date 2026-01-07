<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
const props = defineProps<{
  name: string
}>()
const emit = defineEmits<{
  (e: 'open', value: string): void
}>()

function handleClick() {
  emit('open', props.name)
}
</script>
<template>
  <button
    class="w-[330px] md:w-[196px] h-10 border border-[#C2C7D0] flex justify-between items-center px-2 rounded-sm font-zalando"
    @click="handleClick"
  >
    <div class="capitalize text-[#595959] md:text-sm text-xs">{{ props.name }}</div>
    <div class=""><ChevronDownIcon class="h-4 w-4 text-[#7A8699]" /></div>
  </button>
</template>

<style scoped></style>
