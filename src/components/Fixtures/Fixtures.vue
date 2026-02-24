<script setup lang="ts">
import { computed, onActivated, onMounted, reactive, ref, watch } from 'vue'
import CurrentMatchScore from './fixturesTabComponents/CurrentMatchScore.vue'
import LatestNews from '../common/LatestNews.vue'
import MatchesHeader from './fixturesTabComponents/MatchesHeader.vue'
import MatchesCard from './fixturesTabComponents/MatchesCard.vue'
import { useUnplayedFixtureStore } from '../../stores/useUnplayedFixturesStore'
import { formatToWAT, formatToTime } from '../../utils/dateHelper'
import { useLatestNews } from '../../stores/UseLatestNewsStore'
import dayjs from 'dayjs'
const props = defineProps<{
  filters: {
    competition?: string | null
    team?: string | null
    year?: number
  }
}>()
const newsStore = useLatestNews()
const openIndex = ref<boolean[]>([])

const store = useUnplayedFixtureStore()
onMounted(async () => {
  await newsStore.fetchLatestNews()
})

watch(
  () => props.filters,
  async (newFilters) => {
    await store.fetchFixtures(newFilters)
  },
  { immediate: true, deep: true },
)

const liveScores = computed(() => {
  const now = dayjs()
  return (
    store.fixtures.find((match) => {
      const kickoff = dayjs(match.match_date)
      // match is live if now is between kickoff and kickoff + 120 minutes
      return now.isAfter(kickoff) && now.isBefore(kickoff.add(120, 'minute'))
    }) || null
  )
})

const News = computed(() => newsStore.latestNews)
const groupedFixtures = computed(() => {
  const groups: Record<string, any[]> = {}
  store.fixtures.forEach((match) => {
    const month = dayjs(match.match_date).format('MMMM')
    if (!groups[month]) groups[month] = []
    groups[month].push(match)
  })
  return Object.keys(groups).map((month) => ({
    month,
    matches: groups[month],
  }))
})
watch(
  groupedFixtures,
  (newGroups) => {
    if (newGroups.length > 0) {
      openIndex.value = newGroups.map((_, index) => index === 0)
    }
  },
  { immediate: true },
)
const handleToggle = (index: number) => {
  openIndex.value[index] = !openIndex.value[index]
}
</script>
<template>
  <div class="flex flex-col space-x-0 md:flex-row md:space-x-10 px-4 md:px-0">
    <div class="w-full md:w-2/3">
      <div v-if="store.loading" class="animate-pulse bg-gray-300 h-96 w-full"></div>
      <div v-else-if="store.error">
        {{ store.error }}
      </div>

      <div
        v-else-if="!store.loading && groupedFixtures.length === 0"
        class="font-zalando flex justify-center items-center h-96"
      >
        Fixtures are not available
      </div>
      <div v-else>
        <div v-for="(item, index) in groupedFixtures" :key="index" class="">
          <div>
            <MatchesHeader
              :month="item.month"
              @toggle="handleToggle(index)"
              :collapsible="!openIndex[index]"
            />
            <div class="flex flex-col" v-show="openIndex[index]">
              <div v-for="(match, matchIndex) in item.matches" :key="matchIndex" class="pb-4">
                <MatchesCard
                  :date="formatToWAT(match.match_date)"
                  :leagueName="match.competition"
                  :leagueLogo="match.league_logo_url"
                  :homeTeam="match.home_team.name"
                  homeTeamLogo=""
                  :time="formatToTime(match.match_date)"
                  :awayTeam="match.away_team.name"
                  :awayTeamLogo="match.away_team.logo"
                  :stadium="match.venue"
                />
              </div>
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
            v-if="liveScores"
            :homeTeamScore="liveScores.home_score"
            :awayTeamScore="liveScores.away_score"
            :date="formatToWAT(liveScores.match_date)"
            :time="formatToTime(liveScores.match_date)"
            :homeTeam="liveScores.home_team.name"
            :awayTeam="liveScores.away_team.name"
            :competition="liveScores.competition"
            :LeagueLogo="liveScores.league_logo_url ?? ''"
            :homeTeamLogo="liveScores.home_team.logo ?? ''"
            :awayTeamLogo="liveScores.away_team.logo ?? ''"
            :stadium="liveScores.venue"
            :status="liveScores.is_played"
            class="bg-[#DFE2E6]"
          />

          <div class="text-[#1F1F1F] text-lg md:text-[28px] font-bold font-zalando pt-0 md:pt-4">
            LATEST NEWS
          </div>
          <div class="flex flex-col space-y-4">
            <div v-for="(post, index) in News.slice(0, 2)" :key="index">
              <LatestNews :image="post.thumbnail_url" :title="post.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
