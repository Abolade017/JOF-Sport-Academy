<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useVideosStore } from '../stores/useLatestVideoStore'
import OverLayImage from '../components/News/OverLayImage.vue'
import VideoCard from '../components/common/VideoCard.vue'

dayjs.extend(relativeTime)
const videoStore = useVideosStore()
onMounted(async () => {
  await videoStore.fetchVideos()
})
const playingIndex = ref<number | null>(null)

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
          v-for="(video, index) in videos"
          :key="index"
          class="relative h-[459px] w-full md:w-[389px]"
        >
          <OverLayImage class="h-[459px] w-full md:w-[389px]">
            <VideoCard
              :url="video.video_url"
              :time="dayjs(video.published_at).fromNow()"
              :title="video.title"
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
          v-for="(video, index) in videos"
          :key="index"
          class="relative h-[459px] w-full md:w-[389px]"
        >
          <OverLayImage class="h-[459px] w-full md:w-[389px]">
            <VideoCard
              :url="video.video_url"
              :time="dayjs(video.published_at).fromNow()"
              :title="video.title"
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
  </div>
</template>
