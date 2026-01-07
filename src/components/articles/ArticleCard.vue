<script setup lang="ts">
import type { Article } from '@/data'
const props = defineProps<{
  article: Article
}>()
</script>
<template>
  <article class="bg-white shadow-sm font-zalando border border-[#F0F0F0]">
    <div class="w-full overflow-hidden">
      <img
        :src="'/assets/images/' + article.image"
        alt="article image"
        class="w-full object-cover"
      />
    </div>
    <div class="px-6">
      <div class="text-[13px] text-[#D10303] font-semibold uppercase mt-6">
        {{ article.category }}
      </div>
      <div class="pt-2">
        <div class="text-[18px] text-[#262626] font-semibold">{{ article.title }}</div>
        <div class="text-base text-[#595959] font-normal pt-2">{{ article.description }}</div>
      </div>
      <div class="pt-12 pb-8 text-[12px] text-[#595959]">{{ article.time }}</div>
    </div>
  </article>
</template>
