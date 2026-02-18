<template>
  <slot></slot>
  <!-- <img src="/assets/images/stadium.png" alt="" class="h-[479px] w-full md:w-[286px]" /> -->
  <div class="absolute inset-0 background-overlay pointer-events-none"></div>

  <!-- <div className="absolute p-6 top-2 ">
    <button class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 cursor-pointer">
      <PlayIcon class="flex items-center text-[#318750] h-2.5 w-[8.33px]" />
    </button>
  </div> -->
  <!-- <div class="absolute p-6 bottom-0">
    <div class="flex flex-col space-y-10">
      <div>
        <div class="text-white font-semibold text-[13px] uppercase pb-2">{{ props.type }}</div>
        <div class="uppercase text-white text-lg leading-5 fomt-semibold">
          {{ props.title }}
        </div>
      </div>
      <div class="text-white text-[12px] font-normal uppercase">{{ props.time }}</div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import { PlayIcon } from '@heroicons/vue/16/solid'
import VideoCard from '../common/VideoCard.vue'
const props = defineProps<{
  // type: string
  // text: string
  // time: string
  // title: string
  // videoUrl: string
}>()
// const emit = defineEmits<{
//   (e: 'play-pause', state: boolean): void
// }>()

// const handlePlayPause = (state: boolean) => {
//   emit('play-pause', state)
// }
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
