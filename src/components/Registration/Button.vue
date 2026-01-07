<script setup lang="ts">
const props = defineProps<{
  text: string
  type?: 'button' | 'submit' 
  color?: 'primary' | 'secondary'
  disabled?: boolean
}>()
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>()
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) emit('click', event)
}
</script>
<template>
  <button
    :type="props.type ?? 'button'"
    @click="handleClick"
    :class="[
      'px-4 py-2 flex w-fit h-9 text-white uppercase font-zalando text-sm font-semibold',
      props.color === 'primary'
        ? 'bg-[#8C8C8C] disabled:cursor-not-allowed'
        : 'bg-[#318750] disabled:cursor-not-allowed',
    ]"
    :disabled="props.disabled"
  >
    {{ text }}
  </button>
</template>
