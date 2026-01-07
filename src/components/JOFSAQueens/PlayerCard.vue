<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/16/solid'
const props = defineProps<{
  firstName: string
  lastName: string
  // playerType: string
  // nationality: string
  // height: string
  // color: string
  // weight: string
  shirtNumber: string
  photo: string
}>()
</script>

<template>
  <div class="font-zalando">
    <div class="bg-white w-full md:w-[395px] h-fit shadow-md">
      <div class="bg-player-pattern h-[118px] md:h-[267px] w-full relative">
        <div class="flex flex-col space-y-4 md:p-4 p-2">
          <div class="text-[#1F1F1F] text-xl md:text-[56px] font-bold">
            {{ props.shirtNumber }}
          </div>
          <div class="absolute -top-0.5 md:top-3.5 inset-x-9 md:inset-x-20">
            <img :src="props.photo" alt="player image" />
          </div>
        </div>
      </div>
      <div class="p-2 md:pt-6 md:pb-4 md:px-4">
        <div class="text-[#BFBFBF] text-sm md:text-[18px] font-semibold uppercase">
          {{ props.firstName }} <br />
          <span class="text-[#1F1F1F] text-base md:text-[28px] font-bold leading-2">{{
            props.lastName
          }}</span>
        </div>
        <button
          class="outline-none cursor-pointer text-[#369458] font-semibold text-xs md:text-[13px] flex items-center space-x-2 uppercase mt-4"
        >
          <div>view profile</div>
          <ChevronRightIcon class="text-[#369458] h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  </div>
</template>
