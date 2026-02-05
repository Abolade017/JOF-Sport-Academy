<script setup lang="ts">
import { computed } from 'vue'
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

dayjs.extend(relativeTime)

const props = defineProps<{
  article: NewsDetails
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
const category = computed(() => {
  if (
    props.article.categories &&
    Array.isArray(props.article.categories) &&
    props.article.categories.length > 0
  ) {
    return props.article.categories[0].name || ''
  }
})
const image = computed(() => props.article.thumbnail_url)
const description = computed(() => props.article.excerpt)
const time = computed(() => props.article.published_at)
const title = computed(() => props.article.title)
</script>
<template>
  <article class="shadow-sm border border-[#F0F0F0] cursor-pointer" @click="emit('click')">
    <div class="flex flex-col md:flex-row gap-2 font-zalando">
      <div class="w-full md:w-1/2">
        <img :src="image" alt="article image" class="w-full h-60 md:h-[473px] object-cover" />
      </div>

      <div class="bg-white w-full md:w-1/2 px-3 md:px-6 pt-6 pb-6 md:h-[473px] flex flex-col">
        <div class="text-[13px] text-[#D10303] font-semibold uppercase">
          {{ category }}
        </div>

        <div class="py-2 text-base md:text-[18px] text-[#262626] font-semibold">
          {{ title }}
        </div>

        <div class="text-sm md:text-base text-[#595959] font-normal line-clamp-2">
          {{ description }}
        </div>

        <div class="mt-auto pt-6 text-[12px] text-[#595959]">
          {{ dayjs(time).fromNow() }}
        </div>
      </div>
    </div>
  </article>
</template>

<!-- <template>
  <article class="shadow-sm border border-[#F0F0F0]" @click="emit('click')">
    <div class="flex md:flex-row flex-col gap-2 font-zalando h-[473px]">
      <div class="w-full md:w-1/2">
        <img :src="image" alt="article image" class="h-[473px]" />
      </div>
      <div class="px-3 md:px-6 pt-6 bg-white w-full md:w-1/2 h-[473px]">
        <div class="text-[13px] text-[#D10303] font-semibold uppercase">
          {{ category }}
        </div>
        <div class="py-2 text-base md:text-[18px] text-[#262626] font-semibold">
          {{ title }}
        </div>
        <div class="text-sm md:text-base text-[#595959] font-normal">{{ description }}</div>
        <div class="pt-10 md:pt-[325px] mb-8 text-[12px] text-[#595959]">
          {{ dayjs(time).fromNow() }}
        </div>
      </div>
    </div>
  </article>
</template>-->
