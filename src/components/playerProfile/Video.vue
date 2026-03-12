<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import OverLayImage from '../News/OverLayImage.vue'
import VideoCard from '../common/VideoCard.vue'
import LoadingState from '../common/loadingState.vue'
import Modal from '../common/Modal.vue'
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
const playingIndex = ref<number | null>(null)
const isModalOpen = ref(false)
const selectedVideo = ref<Video | null>(null)

const openModal = (video: Video) => {
  selectedVideo.value = video
  isModalOpen.value = true
}
const isMp4 = (url: string | undefined) => url?.endsWith('.mp4')
const getEmbedUrl = (url: string) => {
  // convert https://www.youtube.com/watch?v=VIDEO_ID -> https://www.youtube.com/embed/VIDEO_ID
  const videoId = url.split('v=')[1]?.split('&')[0] ?? ''
  return `https://www.youtube.com/embed/${videoId}`
}
const playPause = (index: number, isPlaying: boolean) => {
  if (isPlaying) {
    playingIndex.value = index
  } else if (playingIndex.value === index) {
    playingIndex.value = null
  }
}
// const videos = reactive([
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video5.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video5.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
// ])
const videos = computed(() => {
  return videoStore.videos
})
const formatTime = (date: string) => {
  return dayjs(date).fromNow()
}
// const videos = reactive([
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video5.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video5.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   {
//     video: '/assets/videos/video4.mp4',
//     time: '2hours',
//     title: 'Free medical care and academic scholarships',
//     type: 'video',
//   },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
// ])
</script>
<template>
  <div class="md:px-10">
    <div class="text-lg font-bold text-[#1F1F1F] font-zalando-condensed uppercase pb-6">video</div>
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
    <div v-else class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-10 pb-8">
      <div v-for="(video, index) in videos" :key="index" class="relative h-[459px] w-auto">
        <OverLayImage class="h-[459px] w-full">
          <VideoCard
            :url="video.video_url"
            :time="formatTime(video.published_at)"
            :title="video.title"
            @openFullScreen="openModal(video)"
            type="video"
            class="h-[459px] w-full"
          >
            <div
              class="capitalize text-white text-lg md:text-[28px] leading-8 fomt-semibold font-zalando"
            >
              {{ video.title }}
            </div></VideoCard
          >
        </OverLayImage>
      </div>
    </div>
    <Modal v-model="isModalOpen" custom-class="bg-transparent " class="bg-black/70">
      <template #default>
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          @click.self="isModalOpen = false"
        >
          <div class="w-full md:max-w-[938px] mx-auto bg-none">
            <video
              class="w-[938px] h-[367px] bg-transparent"
              v-if="selectedVideo && isMp4(selectedVideo.video_url)"
              :src="selectedVideo.video_url"
              controls
              autoplay
            />
            <iframe
              v-else-if="selectedVideo"
              class="bg-transparent"
              height="367"
              width="938"
              allowfullscreen="true"
              :src="selectedVideo?.video_url && getEmbedUrl(selectedVideo.video_url)"
            ></iframe>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
