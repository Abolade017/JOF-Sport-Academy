<script setup lang="ts">
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
import NextPrevButton from '../common/NextPrevButton.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import OverLayImage from '../News/OverLayImage.vue'
import VideoCard from '../common/VideoCard.vue'

interface Video {
  video_url: string
  title: string
  published_at: string
}
dayjs.extend(relativeTime)
const videoStore = useVideosStore()
onMounted(async () => {
  await videoStore.fetchVideos()
})

const videos = computed(() => {
  return videoStore.videos
})
const formatTime = (date: string) => {
  return dayjs(date).fromNow()
}
const playingIndex = ref<number | null>(null)
const startIndex = ref(0)
const ITEMS_PER_PAGE = 4

// const currentVideo = computed(() => {
//   return videos.value.slice(startIndex.value, startIndex.value + ITEMS_PER_PAGE)
// })
const next = () => {
  if (startIndex.value + ITEMS_PER_PAGE < videos.value.length) {
    startIndex.value += ITEMS_PER_PAGE
  }
}

const prev = () => {
  if (startIndex.value - ITEMS_PER_PAGE >= 0) {
    startIndex.value -= ITEMS_PER_PAGE
  }
}
const playPause = (index: number, isPlaying: boolean) => {
  if (isPlaying) {
    playingIndex.value = index
  } else if (playingIndex.value === index) {
    playingIndex.value = null
  }
}
const selectedVideo = ref<Video | null>(null)
const isMp4 = (url: string | undefined) => url?.endsWith('.mp4')
const getEmbedUrl = (url: string) => {
  // convert https://www.youtube.com/watch?v=VIDEO_ID -> https://www.youtube.com/embed/VIDEO_ID
  const videoId = url.split('v=')[1]?.split('&')[0] ?? ''
  return `https://www.youtube.com/embed/${videoId}`
}

const isModalOpen = ref(false)

const openModal = (video: Video) => {
  selectedVideo.value = video
  isModalOpen.value = true
}

watch(isModalOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <div v-if="videoStore.loading" class="animate-pulse w-full md:max-w-[1216px] mx-auto h-96">
    <LoadingState />
  </div>
  <div
    v-else-if="videoStore.error"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    {{ videoStore.error }}
  </div>
  <div
    v-else-if="!videoStore.loading && videos.length === 0"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    Videos not found
  </div>
  <div v-else class="bg-[#F5F6F7] h-[759px]">
    <div class="w-full md:max-w-[1216px] mx-auto font-zalando">
      <div class="flex justify-between items-center pt-8 md:pt-24 md:px-0 px-6">
        <NewsPageSubHeader
          action="see all videos"
          class="uppercase text-[#318750] text-xs md:text-sm font-semibold"
          url="/videos"
          ><div class="text-[#1F1F1F] font-medium sm:text-20px md:text-[36px] uppercase">
            Latest video
          </div>
          <template #icon>
            <ArrowLongRightIcon class="text-[#318750] w-3 h-3 md:h-[18px] md:w-[18px]" /> </template
        ></NewsPageSubHeader>
        <div class="flex pr-0 md:pr-16">
          <NextPrevButton :disabled="startIndex === 0" @click="prev">
            <ChevronLeftIcon
              class="bg-[#EBF4EE] text-[#D4D4D4 flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
            />
          </NextPrevButton>
          <NextPrevButton :disabled="startIndex + ITEMS_PER_PAGE >= videos.length" @click="next">
            <ChevronRightIcon
              class="bg-[#A3CEB2] text-[#02274D] flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
            />
          </NextPrevButton>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 md:mt-10 px-6 md:px-0 pb-8">
        <div v-for="(video, index) in videos" :key="index" class="relative w-full">
          <OverLayImage class="h-[479px] w-full md:w-[286px]">
            <VideoCard
              :url="video.video_url"
              :time="formatTime(video.published_at)"
              @openFullScreen="openModal(video)"
              type="video"
              class="h-[459px] w-full md:w-[286px]"
            >
              <div class="uppercase text-white text-lg leading-5 fomt-semibold">
                {{ video.title }}
              </div>
            </VideoCard>
          </OverLayImage>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="isModalOpen">
    <template #default>
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        @click.self="isModalOpen = false"
      >
        <div class="w-full md:max-w-[938px] mx-auto">
          <video
            class="w-[938px] h-[367px]"
            v-if="selectedVideo && isMp4(selectedVideo.video_url)"
            :src="selectedVideo.video_url"
            controls
            autoplay
          />
          <iframe
            v-else
            class="w-[938px] h-[367px]"
            allowfullscreen="true"
            :src="selectedVideo?.video_url ? getEmbedUrl(selectedVideo.video_url) : ''"
          ></iframe>
        </div>
      </div>
    </template>
  </Modal>
</template>
