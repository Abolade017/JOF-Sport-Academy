<script setup lang="ts">
import type { Article } from '@/data'
const props = defineProps<{
  article: Article
}>()
</script>
<template>
  <article class="shadow-sm border border-[#F0F0F0]">
    <div class="flex md:flex-row flex-col gap-2 font-zalando h-full">
      <div class="">
        <img :src="'/assets/images/' + article.image" alt="article image" class="h-full" />
      </div>
      <div class="px-3 md:px-6 pt-6 bg-white h-full">
        <div class="text-[13px] text-[#D10303] font-semibold uppercase">
          {{ article.category }}
        </div>
        <div class="py-2 text-base md:text-[18px] text-[#262626] font-semibold">
          {{ article.title }}
        </div>
        <div class="text-sm md:text-base text-[#595959] font-normal">{{ article.description }}</div>
        <div class="pt-10 md:pt-[275px] pb-8 text-[12px] text-[#595959]">
          {{ article.time }}
        </div>
      </div>
    </div>
  </article>
</template>
