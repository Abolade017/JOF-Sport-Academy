<script setup lang="ts">
import { PauseIcon, PlayIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'
const props = defineProps<{
  url?: string
  time: string
  // title: string
  type: string
}>()
// const emit = defineEmits<{ (e: 'playPause', value: boolean): void }>()
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const togglePlay = () => {
  if (!videoRef.value) return

  if (isPlaying.value) {
    videoRef.value.pause()
    console.log('pause')
  } else {
    videoRef.value.play()
    console.log('play')
  }

  isPlaying.value = !isPlaying.value
  // emit('playPause', isPlaying.value)
}
</script>

<template>
  <div class="relative font-zalando">
    <video ref="videoRef" :src="props.url" class="object-cover" />
    <div className="absolute p-6 top-2 ">
      <button
        @click="togglePlay"
        class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 cursor-pointer"
      >
        <PlayIcon class="flex items-center text-[#318750] h-5 w-5" v-if="!isPlaying" />
        <PauseIcon class="flex items-center text-[#318750] h-5 w-5" v-else />
      </button>
    </div>
    <div class="absolute p-6 bottom-0 z-20">
      <div class="flex flex-col space-y-10">
        <div>
          <div class="text-white font-semibold text-[13px] uppercase pb-2">{{ props.type }}</div>
          <slot></slot>
        </div>
        <div class="text-white text-[12px] font-normal uppercase">{{ props.time }}</div>
      </div>
    </div>
  </div>
</template>
