<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/16/solid'

const props = defineProps<{
  month: string
  // date: string
  // time: string
  // homeTeam: string
  // awayTeam: string
  // leagueName: string
  // LeagueLogo: string
  // homeTeamLogo: string
  // awayTeamLogo: string
  // stadium: string
  collapsible: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>
<template>
  <div
    class="bg-[#1F1F1F] text-white font-zalando font-semi-bold text-[22px] flex justify-between items-center px-4 py-3 mb-8"
  >
    <div class="capitalized text-sm md:text-base">{{ props.month }}</div>
    <button @click="emit('toggle')" class="cursor-pointer">
      <ChevronUpIcon
        class="h-4 w-4 text-[#FAFBFB]"
        :class="props.collapsible ? 'rotate-180' : 'rotate-0'"
      />
    </button>
  </div>
</template>
<style scoped></style>
