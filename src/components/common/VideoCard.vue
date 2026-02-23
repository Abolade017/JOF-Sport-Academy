<script setup lang="ts">
import { PauseIcon, PlayIcon } from '@heroicons/vue/16/solid'
import { computed, ref } from 'vue'
const props = defineProps<{
  url?: string
  time: string
  // title: string
  type: string
}>()
const emit = defineEmits<{
  (e: 'openFullScreen'): void
  // (e 'playPause', value: boolean): void
}>()
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
const isYouTube = computed(() => {
  return props.url?.includes('youtube.com') || props.url?.includes('youtu.be')
})

const getEmbedUrl = (url?: string) => {
  if (!url) return ''
  if (url.includes('watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  return ''
}
</script>

<template>
  <div class="relative font-zalando">
    <video
      ref="videoRef"
      :src="props.url"
      class="object-cover"
      v-if="props.url && !isYouTube"
      playsinline
      muted
    >
      <source :src="props.url" type="video/mp4" />
      <source :src="props.url" type="video/ogg" />
      Your browser does not support the video tag.
    </video>
    <iframe
      v-else-if="props.url && isYouTube"
      :src="getEmbedUrl(props.url)"
      class="object-cover w-full h-full pointer-events-none"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="absolute p-6 top-2 z-20" v-if="props.url && !isYouTube">
      <button
        @click="togglePlay"
        class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 pointer-events-auto cursor-pointer"
      >
        <PlayIcon class="flex items-center text-[#318750] h-5 w-5" v-if="!isPlaying" />
        <PauseIcon class="flex items-center text-[#318750] h-5 w-5" v-else />
      </button>
    </div>
    <div v-else-if="props.url && isYouTube" class="absolute p-6 top-2 z-30">
      <button
        class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 pointer-events-auto cursor-pointer"
        @click.stop="emit('openFullScreen')"
      >
        <PlayIcon class="flex items-center text-[#318750] h-5 w-5" />
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
