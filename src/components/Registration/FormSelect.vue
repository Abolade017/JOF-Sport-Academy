<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
interface Option {
  optionText: string
  value: string | number
}
const props = defineProps<{
  modelValue: string | number
  options: Option[]
  defaultOption: string
  //   required?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
<template>
  <div class="relative">
    <select
      name=""
      id=""
      class="border border-[#BFBFBF] h-10 focus:outline-none w-full pl-2 pr-5 appearance-none capitalize"
      :value="props.modelValue"
      @change="updateValue"
    >
      <option value="" disabled selected hidden>
        {{ props.defaultOption }}
      </option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.optionText }}
      </option>
    </select>
    <ChevronDownIcon class="w-5 h-5 text-black absolute bottom-2 right-2.5 pointer-events-none" />
  </div>
</template>
