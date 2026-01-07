<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import NextPrevButton from '../common/NextPrevButton.vue'
import { computed, reactive, ref } from 'vue'
import AchievementNewsCard from './AchievementNewsCard.vue'
const affiliates = reactive([
  {
    title: 'latest news',
    description: 'latest news',
    image: 'public/assets/images/Image4.png',
  },
  {
    title: 'latest news',
    description: 'latest news',
    image: 'public/assets/images/Image4.png',
  },
  {
    title: 'latest news',
    description: 'latest news',
    image: 'public/assets/images/Image4.png',
  },
  {
    title: 'latest news',
    description: 'latest news',
    image: 'public/assets/images/Image4.png',
  },
  {
    title: 'latest news',
    description: 'latest news',
    image: 'public/assets/images/Image4.png',
  },
])
const startIndex = ref(0)
const ITEMS_PER_PAGE = 3
const currentAffiliate = computed(() => {
  return affiliates.slice(startIndex.value, startIndex.value + ITEMS_PER_PAGE)
})
const next = () => {
  if (startIndex.value + ITEMS_PER_PAGE < affiliates.length) {
    startIndex.value += ITEMS_PER_PAGE
  }
}

const prev = () => {
  if (startIndex.value - ITEMS_PER_PAGE >= 0) {
    startIndex.value -= ITEMS_PER_PAGE
  }
}
</script>

<template>
  <div class="bg-[url('/assets/images/field.png')] h-[743px] bg-no-repeat bg-cover">
    <div class="flex flex-col space-y-2 mx-auto md:max-w-[1216px]">
      <div class="flex justify-between items-center mt-[120px] md:mt-[423px] md:px-0 px-6">
        <div
          class="text-white text-lg md:text-[58px] leading-6 md:leading-[68px] font-medium font-zalando uppercase"
        >
          Affiliated with FIFA <br />
          Connect and TMS
        </div>

        <div>
          <div class="flex pr-0">
            <NextPrevButton :disabled="startIndex === 0" @click="prev">
              <ChevronLeftIcon
                class="bg-[#F5F5F5] text-[#D4D4D4 flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
              />
            </NextPrevButton>
            <NextPrevButton
              :disabled="startIndex + ITEMS_PER_PAGE >= affiliates.length"
              @click="next"
            >
              <ChevronRightIcon
                class="bg-white text-[#02274D] flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
              />
            </NextPrevButton>
          </div>
        </div>
      </div>
      <div class="flex md:flex-row flex-col md:gap-o gap-y-4 mt-8 pb-14 md:px-0 px-6">
        <div v-for="(i, index) in currentAffiliate" :key="startIndex + index" class="">
          <AchievementNewsCard :title="i.title" :description="i.description" :image="i.image" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
