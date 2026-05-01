<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import MatchesHeader from './fixturesTabComponents/MatchesHeader.vue'
import CurrentMatchScore from './fixturesTabComponents/CurrentMatchScore.vue'
import LatestNews from '../common/LatestNews.vue'
// import { fixtures, matches } from '../../data'
import MatchesCard from './fixturesTabComponents/MatchesCard.vue'
import { useFixtureResults } from '../../stores/UseFixturesResultStore'
import dayjs from 'dayjs'
import { formatToTime, formatToWAT } from '../../utils/dateHelper'
import { useLatestNews } from '@/stores/UseLatestNewsStore'
const props = defineProps<{
  filters: {
    competition?: string
    team?: string
    year?: number
  }
}>()

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
// const News = reactive([
//   {
//     image: '/assets/images/News/newsB.png',
//     title: 'JOFSA King Launches Youth Academy to Nurture Future Talent',
//   },
//   {
//     image: '/assets/images/News/newsA.png',
//     title: 'JOFSA King Signs New Sponsorship Deal with SportsBrand',
//   },
// ])
const newsStore = useLatestNews()

const News = computed(() => newsStore.latestNews)
onMounted(async () => {
  await newsStore.fetchLatestNews()
})
const store = useFixtureResults()
// const openIndex = ref(fixtures.map((_, index) => index === 0))
const openIndex = ref<boolean[]>([])
const handleToggle = (index: number) => {
  openIndex.value[index] = !openIndex.value[index]
}
const fixtureScores = useFixtureResults()

watch(
  () => props.filters,
  async (newFilters) => {
    await store.fetchFixtureResults(newFilters)
  },
  { immediate: true, deep: true },
)

const groupedFixtures = computed(() => {
  const groups: Record<string, any[]> = {}
  fixtureScores.results.forEach((f) => {
    const month = dayjs(f.match_date).format('MMMM YYYY')
    if (!groups[month]) groups[month] = []
    groups[month].push(f)
  })
  // Convert object to array of { month, matches }
  return Object.keys(groups).map((month) => ({
    month,
    matches: groups[month],
  }))
})
watch(
  groupedFixtures,
  (groups) => {
    if (groups.length) {
      openIndex.value = groups.map((_, index) => index === 0)
    }
  },
  { immediate: true },
)
const error = computed(() => {
  fixtureScores.error
})
const loading = computed(() => {
  fixtureScores.loading
})
</script>
<template>
  <div class="flex flex-col space-x-0 md:flex-row md:space-x-10 px-4 md:px-0">
    <div class="w-full md:w-2/3">
      <div v-if="store.loading" class="animate-pulse bg-gray-300 h-96 w-full"></div>
      <div v-else-if="store.error">{{ store.error }}</div>
      <div
        v-else-if="!store.loading && groupedFixtures.length === 0"
        class="font-zalando flex justify-center items-center h-96 text-[#262626]"
      >
        Results are not available
      </div>
      <div v-else>
        <div v-for="(item, index) in groupedFixtures" :key="index" class="">
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
            <div v-for="(match, matchIndex) in item.matches" :key="matchIndex">
              <MatchesCard
                :date="formatToWAT(match.match_date)"
                leagueName="Nigerian Premier League"
                leagueLogo=""
                :homeTeam="match.home_team.name"
                homeTeamLogo=""
                :time="match.result.home_score + ' ' + '-' + ' ' + match.result.away_score"
                :awayTeam="match.away_team.name"
                :awayTeamLogo="match.away_team.logo"
                :stadium="match.venue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3">
      <div class="text-[#1F1F1F] text-lg md:text-[28px] font-bold font-zalando">LATEST NEWS</div>
      <div class="flex flex-col space-y-4 pt-4">
        <div v-for="(post, index) in News.slice(0, 2)" :key="index">
          <LatestNews :image="post.thumbnail_url" :title="post.title" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
