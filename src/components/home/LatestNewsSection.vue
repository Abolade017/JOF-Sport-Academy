<script setup lang="ts">
import { ArrowLongRightIcon } from '@heroicons/vue/16/solid'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
import FeaturedArticleCard from '../articles/FeaturedArticleCard.vue'
import ArticleCard from '../articles/ArticleCard.vue'
import { useLatestNews } from '../../stores/UseLatestNewsStore'
import { computed, onMounted } from 'vue'
import LoadingState from '../common/loadingState.vue'

const store = useLatestNews()
onMounted(async () => {
  await store.fetchLatestNews()
})
const filteredNews = computed(() => {
  return store.latestNews.filter((article) =>
    article.categories.some((news) => news.name === 'news' || news.name === 'interview'),
  )
})
const featured = computed(() => {
  return store.latestNews[0] ?? null
})
const others = computed(() => {
  return filteredNews.value
})
console.log(others.value)
console.log(featured.value)
</script>
<template>
  <div v-if="store.loading" class="animate-pulse w-full md:max-w-[1216px] mx-auto h-96">
    <LoadingState />
  </div>
  <div
    v-else-if="store.error"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    {{ store.error }}
  </div>
  <div
    v-else-if="!store.loading && others?.length === 0 && featured"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    News not found
  </div>
  <div v-else class="w-full md:max-w-[1216px] mx-auto font-zalando pb-10 md:pb-[83px] md:px-0 px-6">
    <div class="flex justify-between items-center pb-5 md:pb-10 pt-8 md:pt-16 md:px-0 px-6">
      <NewsPageSubHeader
        action="see all news"
        class="uppercase text-[#318750] text-xs md:text-sm font-semibold"
        url="/news"
      >
        <div class="text-[#1F1F1F] font-medium sm:text-20px md:text-[36px] uppercase">
          Latest news
        </div>
        <template #icon>
          <ArrowLongRightIcon class="text-[#318750] w-3 h-3 md:h-[18px] md:w-[18px]" />
        </template>
      </NewsPageSubHeader>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
      <div class="lg:col-span-2">
        <FeaturedArticleCard v-if="featured" :article="featured" />
      </div>

      <div class="col-span-1">
        <ArticleCard v-if="others.length > 0" :article="others[0]" />
      </div>
      <div v-for="(article, index) in others.slice(1)" :key="article.id" class="col-span-1">
        <ArticleCard :article="article" />
      </div>
    </div>
  </div>
</template>
