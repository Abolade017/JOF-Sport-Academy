<script setup lang="ts">
import { PauseIcon, PlayIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'
const props = defineProps<{
  url?: string
  time: string
  title: string
  type: string
}>()
const emit = defineEmits<{ (e: 'playPause', value: boolean): void }>()
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
  emit('playPause', isPlaying.value)
}
</script>

<template>
  <div class="relative font-zalando">
    <video ref="videoRef" :src="props.url" class="object-cover h-[479px] w-full md:w-[286px]" />
    <div className="absolute p-6 top-2 ">
      <button
        @click="togglePlay"
        class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 cursor-pointer"
      >
        <PlayIcon class="flex items-center text-[#318750] h-2.5 w-[8.33px]" v-if="!isPlaying" />
        <PauseIcon class="flex items-center text-[#318750] h-2.5 w-[8.33px]" v-else />
      </button>
    </div>
    <div class="absolute p-6 bottom-4">
      <div class="flex flex-col space-y-2">
        <div>
          <div class="text-white font-semibold text-[13px]">{{ props.type }}</div>
          <div class="uppercase text-white text-lg md:text-[28px] leading-3.5 fomt-semibold">
            {{ props.title }}
          </div>
        </div>
        <div class="text-white text-[12px] font-normal">{{ props.time }}</div>
      </div>
    </div>
  </div>
</template>
