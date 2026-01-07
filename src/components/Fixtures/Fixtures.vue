<script setup lang="ts">
import { reactive, ref } from 'vue'
import CurrentMatchScore from './fixturesTabComponents/CurrentMatchScore.vue'
import LatestNews from '../common/LatestNews.vue'
import { fixtures, matches } from '@/data'
import MatchesHeader from './fixturesTabComponents/MatchesHeader.vue'
import MatchesCard from './fixturesTabComponents/MatchesCard.vue'
// const fixtures = reactive([
//   {
//     month: 'November',
//     date: 'SUN, 05 NOV, 16:15 WAT',
//     time: '15:00',
//     homeTeam: 'Kwara united',
//     awayTeam: 'JOFSA King',
//     leagueName: 'Nigeria Premier League',
//     LeagueLogo: '/assets/images/LeagueLogo.png',
//     homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
//     awayTeamLogo: '/assets/images/AwayTeam/Logo.png',
//     stadium: 'Moshood abiola stadium',
//   },
//   {
//     month: 'December',
//     date: 'SUN, 05 NOV, 16:15 WAT',
//     time: '18:00',
//     homeTeam: 'Kwara united',
//     awayTeam: 'JOFSA King',
//     leagueName: 'Nigeria Premier League',
//     LeagueLogo: '/assets/images/LeagueLogo.png',
//     homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
//     awayTeamLogo: '/assets/images/AwayTeam/Logo.png',
//     stadium: 'Moshood abiola stadium',
//   },
//   {
//     month: 'January',
//     date: 'SUN, 05 NOV, 16:15 WAT',
//     time: '18:00',
//     homeTeam: 'Kwara united',
//     awayTeam: 'JOFSA King',
//     leagueName: 'Nigeria Premier League',
//     LeagueLogo: '/assets/images/LeagueLogo.png',
//     homeTeamLogo: '/assets/images/HomeTeam/Logo.png',
//     awayTeamLogo: '/assets/images/AwayTeam/Logo.png',
//     stadium: 'Moshood abiola stadium',
//   },
// ])
const liveScores = reactive({
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
})
const News = reactive([
  {
    image: '/assets/images/News/newsB.png',
    title: 'JOFSA King Launches Youth Academy to Nurture Future Talent',
  },
  {
    image: '/assets/images/News/newsA.png',
    title: 'JOFSA King Signs New Sponsorship Deal with SportsBrand',
  },
])
// const openIndex = ref(0)
// const handleToggle = (index: number) => {
//   if (openIndex.value === index) {
//     openIndex.value = -1
//   } else {
//     openIndex.value = index
//   }
// }
const openIndex = ref(fixtures.map((_, index) => index === 0))
const handleToggle = (index: number) => {
  openIndex.value[index] = !openIndex.value[index]
}
</script>
<template>
  <div class="flex flex-col space-x-0 md:flex-row md:space-x-10 px-4 md:px-0">
    <div class="w-full md:w-2/3">
      <div v-for="(item, index) in fixtures" :key="index" class="">
        <div>
          <MatchesHeader
            :month="item.month"
            @toggle="handleToggle(index)"
            :collapsible="!openIndex[index]"
          />
          <div class="flex flex-col" v-show="openIndex[index]">
            <div v-for="(match, matchIndex) in matches" :key="matchIndex" class="pb-4">
              <MatchesCard
                :date="match.date"
                :leagueName="match.leagueName"
                :leagueLogo="match.LeagueLogo"
                :homeTeam="match.homeTeam"
                :homeTeamLogo="match.homeTeamLogo"
                :time="match.time"
                :awayTeam="match.awayTeam"
                :awayTeamLogo="match.awayTeamLogo"
                :stadium="match.stadium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3">
      <div class="flex flex-col space-y-6 md:space-y-10">
        <div
          class="bg-[#D10303] text-white font-semibold font-zalando text-xs md:text-sm h-7 md:h-9 w-[229px] flex justify-center items-center md:ml-44 ml-0"
        >
          ADD FIXTURE TO CALENDAR
        </div>
        <div class="flex flex-col space-y-4">
          <CurrentMatchScore
            :homeTeamScore="liveScores.homeTeamScore"
            :awayTeamScore="liveScores.awayTeamScore"
            :date="liveScores.date"
            :time="liveScores.time"
            :homeTeam="liveScores.homeTeam"
            :awayTeam="liveScores.awayTeam"
            :leagueName="liveScores.leagueName"
            :LeagueLogo="liveScores.LeagueLogo"
            :homeTeamLogo="liveScores.homeTeamLogo"
            :awayTeamLogo="liveScores.awayTeamLogo"
            :stadium="liveScores.stadium"
            :status="liveScores.status"
            class="bg-[#DFE2E6]"
          />

          <div class="text-[#1F1F1F] text-lg md:text-[28px] font-bold font-zalando pt-0 md:pt-4">
            LATEST NEWS
          </div>
          <div class="flex flex-col space-y-4">
            <div v-for="(post, index) in News" :key="index">
              <LatestNews :image="post.image" :title="post.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
