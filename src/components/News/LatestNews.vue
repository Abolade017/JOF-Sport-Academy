<template>
  <div class="grid pb-6 md:px-0 px-6">
    <!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-x-0 md:gap-x-44 pb-6 md:px-0 px-6"> -->

    <div v-if="store.loading">
      <LoadingState />
    </div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Featured Article -->
      <div v-if="featured" class="md:col-span-2">
        <FeaturedArticleCard
          :article="featured"
          class="h-[479px] w-full"
          @click="goToNewsDetails(featured.slug)"
        />
      </div>

      <!-- Other Articles -->
      <ArticleCard
        v-for="article in others"
        :key="article.id"
        :article="article"
        @click="goToNewsDetails(article.slug)"
      />
    </div>

    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-0 px-6">
      <ArticleCard
        v-for="article in others"
        :key="article.id"
        :article="article"
        @click="goToNewsDetails(article.slug)"
      />
    </div> -->
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

onMounted(async () => {
  ;(await store.fetchLatestNews(), await videoStore.fetchVideos())
})
const goToNewsDetails = (slug: string) => {
  router.push({
    name: 'news-details',
    params: { slug },
  })
}
</script>
