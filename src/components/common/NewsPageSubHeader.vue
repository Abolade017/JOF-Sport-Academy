<script setup lang="ts">
const props = defineProps<{
  class: string
  url: string
  action: string
}>()
</script>
<template>
  <div class="flex md:space-x-4 space-x-2 items-center">
    <div>
      <slot></slot>
    </div>
    <div class="flex space-x-1 items-center">
      <RouterLink :to="props.url" :class="props.class">{{ props.action }}</RouterLink>
      <slot name="icon"></slot>
    </div>
  </div>
</template>
