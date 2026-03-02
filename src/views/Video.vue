<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useVideosStore } from '../stores/useLatestVideoStore'
import OverLayImage from '../components/News/OverLayImage.vue'
import VideoCard from '../components/common/VideoCard.vue'
import Modal from '../components/common/Modal.vue'
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
const selectedVideo = ref<Video | null>(null)
const isMp4 = (url: string | undefined) => url?.endsWith('.mp4')
const getEmbedUrl = (url: string) => {
  // convert https://www.youtube.com/watch?v=VIDEO_ID -> https://www.youtube.com/embed/VIDEO_ID
  const videoId = url.split('v=')[1]?.split('&')[0] ?? ''
  return `https://www.youtube.com/embed/${videoId}`
}
const formatTime = (date: string) => {
  return dayjs(date).fromNow()
}
const isModalOpen = ref(false)

const openModal = (video: Video) => {
  selectedVideo.value = video
  isModalOpen.value = true
}
const videos = computed(() => {
  return videoStore.videos
})
const latestVideos = computed(() =>
  videos.value.filter((video) =>
    video.categories.some((name) => name.slug.toLowerCase() === 'latest'),
  ),
)
const highlightVideos = computed(() =>
  videos.value.filter((video) => video.categories.some((name) => name.slug === 'highlight')),
)
</script>
<template>
  <div class="w-full md:max-w-[1216px] mx-auto">
    <div class="py-10 md:py-24 md:px-0 px-6">
      <h1
        class="uppercase text-[24px] md:text-[36px] text-[#262626] font-semibold font-zalando pb-4 md:pb-6"
      >
        Latest
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(video, index) in latestVideos"
          :key="index"
          class="relative h-[459px] w-full md:w-[389px]"
        >
          <OverLayImage class="h-[459px] w-full md:w-[389px]">
            <VideoCard
              :url="video.video_url"
              :time="formatTime(video.published_at)"
              :title="video.title"
              @openFullScreen="openModal(video)"
              type="video"
              class="h-[459px] w-full md:w-[389px]"
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
    </div>
    <div class="md:px-0 px-6 md:pb-24 pb-10">
      <h1
        class="uppercase text-[24px] md:text-[36px] text-[#262626] font-semibold font-zalando pb-4 md:pb-6"
      >
        highlights
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(video, index) in highlightVideos"
          :key="index"
          class="relative h-[459px] w-full md:w-[389px]"
        >
          <OverLayImage class="h-[459px] w-full md:w-[389px]">
            <VideoCard
              :url="video.video_url"
              :time="formatTime(video.published_at)"
              :title="video.title"
              @openFullScreen="openModal(video)"
              type="video"
              class="h-[459px] w-full md:w-[389px]"
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
              :src="selectedVideo?.video_url && getEmbedUrl(selectedVideo.video_url)"
            ></iframe>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
