<script setup lang="ts">
const props = defineProps<{ text: string }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    @click="handleClick"
    class="text-[10px] md:text-[13px] font-semibold px-4 py-2 text-sm uppercase font-zalando cursor-pointer"
  >
    {{ text }}
  </button>
</template>
