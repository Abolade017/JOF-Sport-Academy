<script setup lang="ts">
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import NextPrevButton from '../common/NextPrevButton.vue'
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { matches } from '@/data'
import MatchesCard from '../Fixtures/fixturesTabComponents/MatchesCard.vue'
import CurrentMatchScore from '../Fixtures/fixturesTabComponents/CurrentMatchScore.vue'
import NewsPageSubHeader from '../common/NewsPageSubHeader.vue'
const isActive = ref(false)

const liveScores = reactive([
  {
    homeTeamScore: '2',
    awayTeamScore: '1',
    date: 'SUN, 05 NOV, 16:15 WAT',
    time: '18:00',
    homeTeam: 'Kwara united',
    awayTeam: 'JOFSA King',
    leagueName: 'Nigeria Premier League',
    LeagueLogo: '/assets/images/LeagueLogo.png',
    homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
    awayTeamLogo: '/assets/images/jofsa.png',
    stadium: 'Moshood abiola stadium',
    status: 'not started',
  },
  {
    homeTeamScore: '2',
    awayTeamScore: '1',
    date: 'SUN, 05 NOV, 16:15 WAT',
    time: '18:00',
    homeTeam: 'Kwara united',
    awayTeam: 'JOFSA King',
    leagueName: 'Nigeria Premier League',
    LeagueLogo: '/assets/images/LeagueLogo.png',
    homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
    awayTeamLogo: '/assets/images/jofsa.png',
    stadium: 'Moshood abiola stadium',
    status: 'live',
  },
  {
    homeTeamScore: '2',
    awayTeamScore: '1',
    date: 'SUN, 05 NOV, 16:15 WAT',
    time: '18:00',
    homeTeam: 'Kwara united',
    awayTeam: 'JOFSA King',
    leagueName: 'Nigeria Premier League',
    LeagueLogo: '/assets/images/LeagueLogo.png',
    homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
    awayTeamLogo: '/assets/images/jofsa.png',
    stadium: 'Moshood abiola stadium',
    status: 'finished',
  },
  {
    homeTeamScore: '2',
    awayTeamScore: '1',
    date: 'SUN, 05 NOV, 16:15 WAT',
    time: '18:00',
    homeTeam: 'Kwara united',
    awayTeam: 'JOFSA King',
    leagueName: 'Nigeria Premier League',
    LeagueLogo: '/assets/images/LeagueLogo.png',
    homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
    awayTeamLogo: '/assets/images/jofsa.png',
    stadium: 'Moshood abiola stadium',
    status: 'not started',
  },
])
const startIndex = ref(0)
const ITEMS_PER_PAGE = 3

const currentFixture = computed(() => {
  return liveScores.slice(startIndex.value, startIndex.value + ITEMS_PER_PAGE)
})
// console.log(currentFixture)
const next = () => {
  if (startIndex.value + ITEMS_PER_PAGE < liveScores.length) {
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
  <div
    class="striped w-full md:max-w-[1216px] mx-auto bg-green-900 font-zalando bg-no-repeat bg-cover"
  >
    <div class="flex justify-between items-center pt-8 md:pt-16 md:px-0 px-6">
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
      <div class="flex pr-0 md:pr-16">
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
      class="flex md:flex-row flex-col items-start md:items-center px-0 pt-5 pb-8 md:space-y-0 space-y-4 space-x-0 md:pt-10 md:pb-16 md:space-x-6 mx-6 md:mx-16"
    >
      <div
        class="w-full md:w-1/3"
        v-for="(liveScore, index) in currentFixture"
        :key="startIndex + index"
      >
        <CurrentMatchScore
          :homeTeamScore="liveScore.homeTeamScore"
          :awayTeamScore="liveScore.awayTeamScore"
          :date="liveScore.date"
          :time="liveScore.time"
          :homeTeam="liveScore.homeTeam"
          :awayTeam="liveScore.awayTeam"
          :leagueName="liveScore.leagueName"
          :LeagueLogo="liveScore.LeagueLogo"
          :homeTeamLogo="liveScore.homeTeamLogo"
          :awayTeamLogo="liveScore.awayTeamLogo"
          :stadium="liveScore.stadium"
          :status="liveScore.status"
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
