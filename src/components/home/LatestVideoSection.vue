<script setup lang="ts">
import {
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/vue/16/solid'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
import NextPrevButton from '../common/NextPrevButton.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import VideoCard from '../common/VideoCard.vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import OverLayImage from '../News/OverLayImage.vue'

dayjs.extend(relativeTime)
const videoStore = useVideosStore()
onMounted(async () => {
  await videoStore.fetchVideos()
})
const isActive = ref(false)
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
const playingIndex = ref<number | null>(null)
const carouselRef = ref<HTMLDivElement | null>(null)
const startIndex = ref(0)
const ITEMS_PER_PAGE = 4

const currentVideo = computed(() => {
  return videos.value.slice(startIndex.value, startIndex.value + ITEMS_PER_PAGE)
})
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
</script>

<template>
  <div class="bg-[#F5F6F7]">
    <div class="w-full md:max-w-[1216px] mx-auto font-zalando">
      <div class="flex justify-between items-center pt-8 md:pt-24 md:px-0 px-6">
        <NewsPageSubHeader
          action="see all videos"
          class="uppercase text-[#318750] text-xs md:text-sm font-semibold"
          url="/news"
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
          <OverLayImage
            type="video"
            :time="dayjs(video.published_at).fromNow()"
            :videoUrl="video.video_url"
            :title="video.title"
            @play-pause="(state) => playPause(index, state)"
          />
        </div>
      </div>
      <!--   <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 md:mt-10 px-6 md:px-0 pb-8">
        <div
          v-for="(video, index) in currentVideo"
          :key="startIndex + index"
          class="relative w-full"
        >
          <img src="/assets/images/stadium.png" alt="" class="w-full" />

          <div className="absolute p-6 top-2 ">
            <button
              class="flex justify-center items-center h-8 w-8 bg-white shadow-md p-1 cursor-pointer"
            >
              <PlayIcon class="flex items-center text-[#318750] h-2.5 w-[8.33px]" />
            </button>
          </div>
          <!-- <div v-if="videoStore.loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:mt-6 pb-8"> -->
      <!-- <div
              class="h-[473px] w-[286px] animate-pulse bg-gray-300"
              v-for="i in 4"
              :key="i"
            ></div> -->
      <!-- </div>  -->
      <!-- <div v-else-if="videoStore.error"></div> -->

      <!-- <div class="absolute p-6 bottom-0">
          <div class="flex flex-col space-y-10">
            <div>
              <div class="text-white font-semibold text-[13px] uppercase pb-2">video</div>
              <div class="uppercase text-white text-lg leading-5 fomt-semibold">
                Free medical care and academic scholarships
              </div>
            </div>
            <div class="text-white text-[12px] font-normal uppercase">2 hours ago</div>
          </div>
        </div> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- <VideoCard
          :url="video.video"
          :time="video.time"
          :title="video.title"
          :type="video.type"
          @play-pause="(state) => playPause(index, state)"
        /> -->
      <!-- </div> -->
      <!-- <PauseIcon class="flex items-center text-[#318750] h-2.5 w-[8.33px]" v-else /> -->
    </div>
  </div>
</template>
