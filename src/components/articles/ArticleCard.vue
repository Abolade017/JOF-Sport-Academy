<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../../data'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
interface Category {
  name: string
  slug: string
}
interface NewsDetails {
  id: number
  title: string
  slug: string
  excerpt: string
  published_at: string
  thumbnail_url: string
  video_url: string
  categories: Category[]
}
const props = defineProps<{
  article: NewsDetails
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
dayjs.extend(relativeTime)

const categoryName = computed(() => {
  if (
    props.article.categories &&
    Array.isArray(props.article.categories) &&
    props.article.categories.length > 0
  ) {
    return props.article.categories[0].name || 'hello'
  }
})
</script>
<template>
  <article
    class="bg-white shadow-sm font-zalando border border-[#F0F0F0] md:h-[473px]"
    @click="emit('click')"
  >
    <div class="w-full overflow-hidden">
      <img :src="article.thumbnail_url" alt="article image" class="w-full h-[227px] object-cover" />
    </div>
    <div class="px-6">
      <div class="text-[13px] text-[#D10303] font-semibold uppercase mt-6">
        {{ categoryName }}
      </div>
      <div class="mt-2">
        <div class="text-[18px] text-[#262626] font-semibold">{{ article.title }}</div>
        <div class="text-base text-[#595959] font-normal mt-2">{{ article.excerpt }}</div>
      </div>
      <div class="mt-12 md:mt-[124px] mb-8 text-[12px] text-[#595959]">
        {{ dayjs(article.published_at).fromNow() }}
      </div>
    </div>
  </article>
</template>
