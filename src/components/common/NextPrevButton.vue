<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
<template>
  <div class="flex">
    <button
      :disabled="disabled"
      @click="handleClick"
      :class="['flex items-center justify-center ', disabled ? ' cursor-not-allowed' : '']"
    >
      <slot></slot>
    </button>
  </div>
</template>
