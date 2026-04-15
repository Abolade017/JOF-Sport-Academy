<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="md:w-1/2 flex h-[448px] md:h-[896px] items-center justify-center">
      <div class="flex items-center ml-4 md:ml-0 h-full">
        <div class="flex flex-col gap-[50px] md:gap-[120px]">
          <div>
            <h1 class="text-[#D10303] text-[13px] font-semibold uppercase font-zalando">
              {{ props.type }}
            </h1>
            <div class="mt-4">
              <h2
                class="text-lg md:text-[46px] font-semibold uppercase leading-14 font-zalando-condensed"
              >
                {{ props.title }}
              </h2>
            </div>
          </div>
          <div class="flex space-x-2 font-zalando text-[#595959]">
            <p class="mb-4">{{ props.date }}</p>
            <p>{{ props.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/2">
      <ArticleImage :src="props.imageUrl" :alt="props.title" :imageCredit="props.imageCredit" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ArticleImage from './articleImage.vue'

const props = defineProps<{
  title: string
  date: string
  imageUrl: string
  imageCredit: string
  // content: string
  type: string
  time: string
}>()
</script>
