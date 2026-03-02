<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>
<template>
  <div>
    <h1 class="uppercase text-[#1F1F1F] font-bold text-lg md:text-[28px]">{{ props.title }}</h1>
    <slot></slot>
  </div>
</template>
