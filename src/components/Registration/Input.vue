<script setup lang="ts">
interface Props {
  modelValue: string
  type?: string
  //   required?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
<template>
  <div class="font-zalando">
    <input
      :type="props.type ?? 'text'"
      :value="props.modelValue"
      @input="updateValue"
      class="border border-[#BFBFBF] h-10 focus:outline-none pl-3 w-full"
    />
  </div>
</template>
