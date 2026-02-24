<template>
  <div>
    <div class="grid pb-6 md:px-0 px-6">
      <!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-x-0 md:gap-x-44 pb-6 md:px-0 px-6"> -->
      <div class="md:col-span-2 col-span-1">
        <div v-if="store.loading">
          <LoadingState />
        </div>
        <div v-if="store.error">{{ store.error }}</div>
        <FeaturedArticleCard
          v-if="featured"
          :article="featured"
          class="h-[479px] md:w-[906px]"
          @click="goToNewsDetails(featured.slug)"
        />
      </div>
      <!-- <div class="">
        <div v-if="videoStore.loading">
          <div class="h-[473px] w-[286px] animate-pulse bg-gray-300"></div>
        </div>
        <div v-else-if="videoStore.error"></div>
        <div v-else-if="featuredVideo" class="relative w-full">
          <OverLayImage class="h-[479px] w-full md:w-[286px]">
            <VideoCard
              :url="featuredVideo.video_url"
              :time="dayjs(featuredVideo.published_at).fromNow()"
              type="video"
              @openFullScreen="openModal(featuredVideo)"
              class="h-[479px] w-full md:w-[286px]"
            >
              <div class="uppercase text-white text-lg leading-5 fomt-semibold">
                {{ featuredVideo.title }}
              </div></VideoCard
            >
          </OverLayImage>
        </div>
      </div> -->
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-0 px-6">
      <ArticleCard
        v-for="article in others"
        :key="article.id"
        :article="article"
        @click="goToNewsDetails(article.slug)"
      />
    </div>
    <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:mt-6 pb-8">
      <div v-for="(video, index) in videos" :key="index" class="relative w-full">
        <OverLayImage class="h-[459px] w-full md:w-[389px]">
          <VideoCard
            :url="video.video_url"
            :time="dayjs(video.published_at).fromNow()"
            :title="video.title"
            @openFullScreen="openModal(video)"
            type="video"
            class="h-[479px] w-full md:w-[286px]"
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
    <Modal v-model="isModalOpen" custom-class="bg-transparent " class="bg-black/25">
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
              :src="selectedVideo?.video_url ? getEmbedUrl(selectedVideo.video_url) : ''"
            ></iframe>
          </div>
        </div>
      </template>
    </Modal> -->
  </div>
</template>
<script setup lang="ts">
import FeaturedArticleCard from '../articles/FeaturedArticleCard.vue'
import ArticleCard from '../articles/ArticleCard.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLatestNews } from '../../stores/UseLatestNewsStore'
import OverLayImage from './OverLayImage.vue'
import LoadingState from '../common/loadingState.vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import VideoCard from '../common/VideoCard.vue'
import Modal from '../common/Modal.vue'
interface Video {
  video_url: string
  title: string
  published_at: string
}
dayjs.extend(relativeTime)
const store = useLatestNews()
const videoStore = useVideosStore()
const router = useRouter()

const latestNews = computed(() => {
  return store.latestNews
    .slice()
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
})
const featured = computed(() => {
  return latestNews.value[0] ?? null
})

const others = computed(() => {
  return latestNews.value.slice(1)
})

const featuredVideo = computed(() => {
  return videoStore.videos[0] ?? null
})
onMounted(async () => {
  ;(await store.fetchLatestNews(), await videoStore.fetchVideos())
})
const goToNewsDetails = (slug: string) => {
  router.push({
    name: 'news-details',
    params: { slug },
  })
}
const videos = computed(() => {
  return videoStore.videos.slice(1)
})
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

//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
// ])
</script>
