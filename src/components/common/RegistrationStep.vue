<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'
const props = defineProps<
  {
    step: number;
    stepName: string;
    isActive: boolean;
    isCompleted:boolean
  }
  >()
const emit = defineEmits<{
  'toggle-active': [value: boolean]
}>()
const handleActive = () => {
  emit('toggle-active', !props.isActive)
}
</script>
<template>
  <div class="flex md:space-x-5 space-x-3">
    <div class="flex flex-col gap-2 items-center" @click="handleActive()">
      <div
        :class="
          props.isActive||props.isCompleted
            ? 'bg-[#318750] font-semibold h-[30px] w-[27px] text-white text-sm  '
            : 'text-[#8C8C8C] bg-none font-medium h-[30px] w-[27px] text-sm'
        "
        class="cursor-pointer font-zalando text-sm"
      >
        <div class="flex justify-center items-center h-full w-full">{{ props.step }}</div>
      </div>
      <div
        :class="
          props.isActive||props.isCompleted
            ? 'text-[#454545] md:text-sm text-xs font font-zalando font-medium text-center'
            : 'text-[#8C8C8C] md:text-sm text-xs font-medium font-zalando text-center'
        "
      >
        {{ props.stepName }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>
