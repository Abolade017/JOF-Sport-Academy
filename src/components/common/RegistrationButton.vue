<script setup lang="ts">
const props = defineProps<{ text: string; linkUrl: string }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const handleClick = () => {
  emit('click')
}
</script>

<template>
  <a
    :href="props.linkUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="text-[10px] md:text-[13px] font-semibold px-4 py-2 text-sm uppercase font-zalando cursor-pointer"
  >
    {{ props.text }}
  </a>
</template>
