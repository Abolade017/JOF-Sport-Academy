<template>
  <div>
    <div class="border-b border-[#D9D9D9]">
      <div
        class="max-w-[1216px] mx-auto font-nippo font-medium text-[23px] md:text-[46px] uppercase h-[52px] md:h-[104px] flex items-center md:pl-0 pl-6"
      >
        News
      </div>
    </div>
    <div class="w-full md:max-w-[1216px] mx-auto">
      <div class="flex space-x-[25px] items-center font-zalando md:px-0 px-6">
        <div v-for="(tab, index) in tabs" :key="index" class="py-[25px]">
          <button
            @click="selectedTab = tab.component"
            :class="
              selectedTab === tab.component
                ? 'uppercase text-[#369458] underline  decoration-4 decoration-[#369458]  underline-offset-20 text-xs md:text-sm font-medium cursor-pointer'
                : 'uppercase text-[#8C8C8C] text-xs md:text-sm font-medium cursor-pointer'
            "
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
      <div class="mt-4 md:mt-8">
        <component :is="componentsMap[selectedTab]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import QueensNews from '../components/News/QueensNews.vue'
// import KingsNews from '../components/News/KingsNews.vue'
// import KidsNews from '../components/News/KidsNews.vue'
// import PrincesNews from '../components/News/PrincesNews.vue'
import LatestNews from '../components/News/LatestNews.vue'

const tabs = [
  { name: 'Latest', component: 'LatestNews' },
  // { name: 'Queens', component: 'QueensNews' },
  // { name: 'Kings', component: 'KingsNews' },
  // { name: 'Kids', component: 'KidsNews' },
  // { name: 'Princes', component: 'PrincesNews' },
]

const selectedTab = ref(tabs[0].component)
const componentsMap: any = {
  LatestNews,
  // QueensNews,
  // KingsNews,
  // KidsNews,
  // PrincesNews,
}
</script>
