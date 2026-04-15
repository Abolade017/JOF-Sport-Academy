<script setup lang="ts">
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import NextPrevButton from '../common/NextPrevButton.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import CurrentMatchScore from '../Fixtures/fixturesTabComponents/CurrentMatchScore.vue'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
import { useFixtureStore } from '../../stores/useAllFixturesStore'
import type { Fixtures } from '../../types/Fixtures'
import { formatToWAT, formatToTime } from '../../utils/dateHelper'
import LoadingState from '../common/loadingState.vue'

const store = useFixtureStore()
onMounted(async () => {
  await store.fetchFixtures()
})

const liveScores = computed(() => store.fixtures)
console.log(liveScores)
const startIndex = ref(0)
const ITEMS_PER_PAGE = 3

const currentFixture = computed<Fixtures[]>(() => {
  if (!liveScores.value.length) return []

  return liveScores.value.slice(startIndex.value, startIndex.value + ITEMS_PER_PAGE)
})
const next = () => {
  if (startIndex.value + ITEMS_PER_PAGE < liveScores.value.length) {
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
  <div v-if="store.loading" class="animate-pulse w-full max-w-[1216px] mx-auto h-96">
    <LoadingState />
  </div>
  <div
    v-else-if="store.error"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    {{ store.error }}
  </div>
  <div
    v-else-if="!store.loading && liveScores.length === 0"
    class="flex justify-center items-center h-96 text-[#262626] font-zalando"
  >
    Fixtures not found
  </div>
  <div
    v-else
    class="striped w-full max-w-[1216px] mx-auto bg-green-900 font-zalando bg-no-repeat bg-cover"
  >
    <div
      class="flex justify-between items-center pt-8 md:pt-16 px-6 md:px-0 max-w-[1140px] mx-auto"
    >
      <NewsPageSubHeader
        action="see all fixtures"
        class="uppercase text-[#C1DECB] text-xs md:text-sm font-semibold"
        url="/fixtures"
      >
        <div class="text-white font-medium sm:text-[20px] md:text-[36px] uppercase">fixtures</div>
        <template #icon>
          <ArrowLongRightIcon class="text-[#C1DECB] w-3 h-3 md:h-[18px] md:w-[18px]" />
        </template>
      </NewsPageSubHeader>

      <div class="flex">
        <NextPrevButton :disabled="startIndex === 0" @click="prev">
          <ChevronLeftIcon
            class="bg-[#EAEFFC] text-[#D4D4D4 flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
          />
        </NextPrevButton>
        <NextPrevButton :disabled="startIndex + ITEMS_PER_PAGE >= liveScores.length" @click="next">
          <ChevronRightIcon
            class="bg-[#A3CEB2] text-[#02274D] flex justify-center items-center p-1.5 md:p-3 h-8 md:h-12 md:w-12"
          />
        </NextPrevButton>
      </div>
    </div>
    <div
      class="flex md:flex-row flex-col pt-5 pb-8 gap-y-4 gap-x-0 md:pt-10 md:pb-16 md:gap-x-6 md:gap-y-0 md:px-0 px-6 max-w-[1140px] mx-auto"
    >
      <div
        class="w-full md:w-1/3"
        v-for="(liveScore, index) in currentFixture"
        :key="startIndex + index"
      >
        <CurrentMatchScore
          :homeTeamScore="liveScore.home_score"
          :awayTeamScore="liveScore.away_score"
          :date="formatToWAT(liveScore.match_date)"
          :time="formatToTime(liveScore.match_date)"
          :homeTeam="liveScore.home_team.name"
          :awayTeam="liveScore.away_team.name"
          :homeTeamLogo="liveScore.home_team.logo"
          :awayTeamLogo="liveScore.away_team.logo"
          :competition="liveScore.competition"
          :LeagueLogo="liveScore.league_logo_url"
          :stadium="liveScore.venue"
          :status="liveScore.is_played"
          class="bg-white border-t-4 border-t-[#78B78F]"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.striped {
  background-image: url('/public/assets/images/Group.svg');
}
</style>
