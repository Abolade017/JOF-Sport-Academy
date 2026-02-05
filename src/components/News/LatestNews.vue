<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-x-0 md:gap-x-44 pb-6 md:px-0 px-6">
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
      <div class="">
        <div v-if="videoStore.loading">
          <div class="h-[473px] w-[286px] animate-pulse bg-gray-300"></div>
        </div>
        <div v-else-if="videoStore.error"></div>
        <div v-else-if="featuredVideo" class="relative w-full">
          <OverLayImage
            type="video"
            :time="dayjs(featuredVideo.published_at).fromNow()"
            :videoUrl="featuredVideo.video_url"
            :title="featuredVideo.title"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard
        v-for="article in others.slice(0, 1)"
        :key="article.id"
        :article="article"
        @click="goToNewsDetails(article.slug)"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:mt-6 pb-8">
      <div v-for="(video, index) in videos" :key="index" class="relative w-full">
        <OverLayImage
          type="video"
          :time="dayjs(video.published_at).fromNow()"
          :videoUrl="video.video_url"
          :title="video.title"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FeaturedArticleCard from '../articles/FeaturedArticleCard.vue'
import ArticleCard from '../articles/ArticleCard.vue'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLatestNews } from '../../stores/UseLatestNewsStore'
import OverLayImage from './OverLayImage.vue'
import LoadingState from '../common/loadingState.vue'
import { useVideosStore } from '../../stores/useLatestVideoStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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

//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
//   //   { video: '/assets/videos/video5.mp4' },
//   //   { video: '/assets/videos/video4.mp4' },
// ])
</script>
