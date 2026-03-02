<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>
<template>
  <label for="" class="text-base font-normal text-[#2F2F33] capitalize">{{ props.name }}</label>
</template>
