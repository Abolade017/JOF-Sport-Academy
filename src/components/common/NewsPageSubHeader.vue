<script setup lang="ts">
const props = defineProps<{
  class: string
  url: string
  action: string
}>()
</script>
<template>
  <div class="flex space-x-2 items-center pl-0 md:pl-16">
    <slot></slot>
    <div class="flex space-x-1 items-center">
      <RouterLink :to="props.url" :class="props.class">{{ props.action }}</RouterLink>
      <slot name="icon"></slot>
    </div>
  </div>
</template>
