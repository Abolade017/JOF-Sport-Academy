<script setup lang="ts">
import { reactive } from 'vue'
import LatestNews from '../common/LatestNews.vue'
import LeagueTable from '../common/LeagueTable.vue'
import { LeagueTableRow } from '@/data'

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
</script>
<template>
  <div class="flex flex-col space-x-0 md:flex-row md:space-x-10 px-4 md:px-0">
    <div class="w-full md:w-2/3">
      <LeagueTable title="Nigerian Premier League 2025-2026">
        <tr
          v-for="(row, index) in LeagueTableRow"
          :key="index"
          class="h-18 p-4 border-b border-b-[#DFE2E6]"
        >
          <td class="p-4 text-[#262626] md:text-base text-sm font-medium capitalize text-left">
            {{ row.pos }}
          </td>
          <td class="p-4 text-[#262626] md:text-base text-sm font-medium capitalize text-left">
            <div class="flex space-x-2 md:space-x-6 items-center">
              <div><img :src="row.teamLogo" alt="Team Logo" class="md:w-10 md:h-10 w-6 h-6" /></div>
              <div class="md:text-base text-sm">{{ row.team }}</div>
            </div>
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.P }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.W }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.D }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.L }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.GF }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.GA }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.GD }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.difference }}
          </td>
          <td class="p-4 text-[#262626] md:text-base font-medium capitalize text-left text-sm">
            {{ row.Pts }}
          </td>
        </tr></LeagueTable
      >
    </div>
    <div class="w-full md:w-1/3 md:pt-0 pt-8">
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
