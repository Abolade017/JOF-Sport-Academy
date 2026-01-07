<script setup lang="ts">
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
import NextPrevButton from '../common/NextPrevButton.vue'
import { articles } from '@/data'
import { reactive, ref } from 'vue'
import FeaturedArticleCard from '../articles/FeaturedArticleCard.vue'
import ArticleCard from '../articles/ArticleCard.vue'
const isActive = ref(false)
const featured = articles.find((article) => article.featured)
const others = articles.filter((article) => !article.featured)
</script>
<template>
  <div class="w-full md:max-w-[1216px] mx-auto font-zalando pb-10 md:pb-[83px] md:px-0 px-6">
    <div class="flex justify-between items-center pb-5 md:pb-10 pt-8 md:pt-16 md:px-0 px-6">
      <NewsPageSubHeader
        action="see all news"
        class="uppercase text-[#318750] text-xs md:text-sm font-semibold"
        url="/news"
        ><div class="text-[#1F1F1F] font-medium sm:text-20px md:text-[36px] uppercase">
          Latest news
        </div>
        <template #icon>
          <ArrowLongRightIcon class="text-[#318750] w-3 h-3 md:h-[18px] md:w-[18px]" /> </template
      ></NewsPageSubHeader>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
      <div class="lg:col-span-2">
        <FeaturedArticleCard v-if="featured" :article="featured" />
      </div>

      <div class="space-y-8">
        <ArticleCard v-for="article in others.slice(0, 1)" :key="article.id" :article="article" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard v-for="article in others.slice(1)" :key="article.id" :article="article" />
    </div>
  </div>
</template>
