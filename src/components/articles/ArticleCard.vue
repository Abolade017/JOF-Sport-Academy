<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NewsDetails } from '../../types/newsDetails'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const props = defineProps<{
  article?: NewsDetails
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
dayjs.extend(relativeTime)
const formatTime = (date: string) => {
  return dayjs(date).fromNow()
}
const categoryName = computed(() => {
  if (
    props.article?.categories &&
    Array.isArray(props.article.categories) &&
    props.article?.categories.length > 0
  ) {
    return props.article.categories[0]?.name ?? null
  }
})
const fallbackImage = '/assets/images/articleImage1.png'

const imgSrc = ref(props.article?.thumbnail_url || fallbackImage)
const handleError = () => {
  imgSrc.value = fallbackImage
}
</script>
<template>
  <article
    class="bg-white shadow-sm font-zalando border border-[#F0F0F0] md:h-[473px]"
    @click="emit('click')"
  >
    <div class="w-full overflow-hidden">
      <img
        :src="imgSrc"
        @error="handleError"
        alt="article image"
        class="w-full h-[227px] object-cover"
      />
    </div>
    <div class="px-6">
      <div class="text-[13px] text-[#D10303] font-semibold uppercase mt-6">
        {{ categoryName }}
      </div>
      <div class="mt-2">
        <div class="text-[18px] text-[#262626] font-semibold">{{ article?.title }}</div>
        <div class="text-base text-[#595959] font-normal mt-2 line-clamp-2">
          {{ article?.excerpt }}
        </div>
      </div>
      <div class="mt-12 md:mt-10 mb-8 text-[12px] text-[#595959]">
        {{ formatTime(article?.published_at ?? '') }}
      </div>
    </div>
  </article>
</template>
