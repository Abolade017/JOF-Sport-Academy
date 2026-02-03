<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Braedcrumbs from '../components/common/Braedcrumbs.vue'
import { useRoute } from 'vue-router'
import Biography from '../components/playerProfile/Biography.vue'
import Statistics from '../components/playerProfile/Statistics.vue'
import Video from '../components/playerProfile/Video.vue'
import { usePlayerProfileStore } from '../stores/PlayerProfileStore'
import LoadingState from '../components/common/loadingState.vue'
const route = useRoute()
const playerId = computed(() => Number(route.params.id))
const store = usePlayerProfileStore()
onMounted(async () => {
  await store.fetchPlayerProfile(playerId.value)
})
const player = computed(() => store.playerProfile)
console.log(player)
const tabs = reactive([
  { name: 'Biography', url: '/biography', component: 'Biography' },
  { name: 'Statistics', url: '/statistics', component: 'Statistics' },
  { name: 'Video', url: '/video', component: 'Video' },
])
const componentsMap: any = {
  Biography,
  Statistics,
  Video,
}
const selectedTab = ref(tabs[0])
</script>
<template>
  <div class="pb-[162px]">
    <div class="bg-[#0F2717]">
      <!-- <div class="max-w-[1216px] mx-auto px-4 font-zalando text-[12px] py-1">
        <Braedcrumbs />
      </div> -->
    </div>
    <div v-if="store.loading" class="p-10 text-center"><LoadingState /></div>

    <div v-else-if="store.error" class="p-10 text-red-600 text-center">
      {{ store.error }}
    </div>
    <div v-else-if="!player" class="font-zalando flex justify-center items- text-[#595959]">
      Player profile is not available
    </div>
    <div class="max-w-7xl mx-auto shadow-md" v-else="player">
      <div class="font-zalando text-[12px] py-1 bg-[#26693E]">
        <div class="flex items-center md:px-0 px-4">
          <div class="flex space-x-10">
            <div class="text-[#FCFCFC] font-bold text-4xl md:text-[120px]">
              {{ player.jersey_number }}
            </div>
            <div>
              <img :src="player.photo" alt="player photo" v-if="player.photo" />
              <img src="/assets/images/player.png" alt="player photo" v-else />
            </div>
          </div>
          <div>
            <p
              class="text-[#BFBFBF] text-xl md:text-[32px] font-semibold uppercase leading-8 md:leading-14"
            >
              {{ player.first_name }} <br />
              <span class="text-white font-bold text-3xl md:text-[80px] uppercase">
                {{ player.last_name }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="w-1/3 bg-[#F0F0F0] h-auto">
          <div
            class="flex flex-col gap-4 border-b border-[#D9D9D9] text-[#1F1F1F] font-bold uppercase text-lg md:text-[24px] pl-4 md:pl-6 py-4 md:py-6"
          >
            Player details
          </div>
          <div v-for="(tab, index) in tabs" :key="index" class="border-b border-[#D9D9D9]">
            <div
              @click="selectedTab = tab"
              :class="[
                'w-full py-4 uppercase text-[#1F1F1F] text-sm md:text-[16px] font-medium cursor-pointer pl-4 md:pl-[22px',
                selectedTab.name === tab.name ? 'border-l-4 border-red-500' : 'border-none',
              ]"
            >
              {{ tab.name }}
            </div>
          </div>
        </div>
        <div class="w-2/3">
          <!-- <KeepAlive> -->
          <component
            :is="componentsMap[selectedTab.component]"
            :key="selectedTab.component"
            :player="{
              first_name: player.first_name,
              last_name: player.last_name,
              position: player.position,
              nationality: player.nationality,
            }"
            class="p-6"
          />
          <!-- </KeepAlive> -->
        </div>
      </div>
    </div>
  </div>
</template>
