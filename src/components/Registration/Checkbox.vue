<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <input
    type="checkbox"
    class="h-4 w-4 rounded"
    :checked="modelValue"
    :disabled="disabled"
    @change="toggle"
  />
</template>
