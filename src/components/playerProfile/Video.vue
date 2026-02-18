<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import OverLayImage from '../News/OverLayImage.vue'
import VideoCard from '../common/VideoCard.vue'
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
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-10 pb-8">
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
</template>
