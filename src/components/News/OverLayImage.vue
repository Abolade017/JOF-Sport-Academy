<template>
  <slot></slot>
  <div class="absolute inset-0 background-overlay pointer-events-none"></div>
</template>
<script setup lang="ts">
const props = defineProps<{}>()
</script>
<style scoped>
.background-overlay {
  background: linear-gradient(
    180deg,
    rgba(23, 62, 37, 0) 35.27%,
    rgba(23, 62, 37, 0.8) 67.99%,
    #173e25 83.49%
  );
}
</style>
