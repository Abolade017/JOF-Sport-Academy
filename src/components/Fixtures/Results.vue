<script setup lang="ts">
import { reactive, ref } from 'vue'
import MatchesHeader from './fixturesTabComponents/MatchesHeader.vue'
import CurrentMatchScore from './fixturesTabComponents/CurrentMatchScore.vue'
import LatestNews from '../common/LatestNews.vue'
import { fixtures, matches } from '@/data'
import MatchesCard from './fixturesTabComponents/MatchesCard.vue'
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
        <!-- <Matches
          :month="item.month"
          :date="item.date"
          :time="item.time"
          :homeTeam="item.homeTeam"
          :awayTeam="item.awayTeam"
          :leagueName="item.leagueName"
          :LeagueLogo="item.LeagueLogo"
          :homeTeamLogo="item.homeTeamLogo"
          :awayTeamLogo="item.awayTeamLogo"
          :stadium="item.stadium"
          :collapsible="!!openIndex[index]"
          @toggle="handleToggle(index)"
        /> -->
        <MatchesHeader
          :month="item.month"
          @toggle="handleToggle(index)"
          :collapsible="!openIndex[index]"
        />
        <div class="flex flex-col py-4" v-show="openIndex[index]">
          <div v-for="(match, matchIndex) in matches" :key="matchIndex">
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
    <div class="w-full md:w-1/3">
      <div class="text-[#1F1F1F] text-lg md:text-[28px] font-bold font-zalando">LATEST NEWS</div>
      <div class="flex flex-col space-y-4 pt-4">
        <div v-for="(post, index) in News" :key="index">
          <LatestNews :image="post.image" :title="post.title" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
