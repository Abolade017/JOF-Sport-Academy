<template>
  <div>
    <img :src="props.src" :alt="props.alt" class="w-full" />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  imageCredit?: string
}>()
</script>
