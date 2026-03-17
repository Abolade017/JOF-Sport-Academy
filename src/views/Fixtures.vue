<script setup lang="ts">
import { ref, computed, KeepAlive, onMounted, watch, onActivated } from 'vue'
import DropdownFilter from '../components/home/DropdownFilter.vue'
import SubHeader from '../components/common/SubHeader.vue'
import Fixtures from '../components/Fixtures/Fixtures.vue'
import Results from '../components/Fixtures/Results.vue'
import Table from '../components/Fixtures/Table.vue'
import { useTeamNameStore } from '../stores/TeamStore'
import { useCompetitonStore } from '../stores/useCompetitionStore'
const store = useTeamNameStore()
const selectedTeam = ref('Team Strikers')
const years = ['2025/2026', '2026/2027']
const tabs = [{ name: 'fixtures' }, { name: 'results' }, { name: 'table' }]
const activeTab = ref('fixtures')
const openTeam = ref(false)
const openYear = ref(false)
const opencompetition = ref(false)
const selectedYear = ref('2026/2027')
const selectedCompetition = ref('Bds')
const competitionStore = useCompetitonStore()
onMounted(async () => {
  await store.fetchTeam()
  await competitionStore.fetchcompetitions()
})
const options = computed(() => {
  return store.teams.map((team) => team.name)
})
const competitions = computed(() => {
  return competitionStore.competitions.map((name) => name.competition)
})
// watch selected team options
watch(
  options,
  (teams) => {
    if (teams.length && !selectedTeam.value) {
      selectedTeam.value = teams[0] ?? ''
    }
  },
  { immediate: true },
)
// watch selected competition
watch(
  competitions,
  (list) => {
    if (list.length && !selectedCompetition.value) {
      selectedCompetition.value = list[0] ?? ''
    }
  },
  { immediate: true },
)

const filters = computed(() => {
  return {
    competition: selectedCompetition.value ? selectedCompetition.value.toLowerCase() : undefined,
    team: selectedTeam.value,
    year: selectedYear.value ? Number(selectedYear.value.split('/')[0]) : undefined,
  }
})

const openTeamDropdown = () => {
  openTeam.value = !openTeam.value
}
const selectTeam = (option: string) => {
  selectedTeam.value = option
  openTeam.value = false
}
const openYearDropdown = () => {
  openYear.value = !openYear.value
}
const selectYear = (option: string) => {
  selectedYear.value = option
  openYear.value = false
}
const openCompetitionDropdown = () => {
  opencompetition.value = !opencompetition.value
}
const selectCompetition = (option: string) => {
  selectedCompetition.value = option
  opencompetition.value = false
}
const headerName = computed(() => {
  return activeTab.value.charAt(0).toUpperCase() + activeTab.value.slice(1)
})
const componentsMap: any = {
  fixtures: Fixtures,
  results: Results,
  table: Table,
}
const activeComponent = computed(() => {
  return activeTab.value ? componentsMap[activeTab.value] : null
})
</script>

<template>
  <div></div>
  <SubHeader :headerName="headerName" />
  <div class="max-w-[1250px] mx-auto">
    <div
      class="flex md:flex-row flex-col space-y-10 justify-between items-center py-4 font-zalando mx-4 md:mx-0"
    >
      <div class="flex items-center justify-between space-x-[88px] sm:space-x-32 md:space-x-6">
        <div v-for="(item, index) in tabs" :key="index">
          <div
            :class="
              activeTab === item.name
                ? 'uppercase text-[#369458] underline  decoration-4 decoration-[#369458]  underline-offset-20 text-xs md:text-sm cursor-pointer'
                : 'uppercase text-[#8C8C8C] text-xs md:text-sm cursor-pointer'
            "
            @click="activeTab = item.name"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="flex md:flex-row flex-col space-y-4 space-x-0 md:space-y-0 md:space-x-3 items-center md:mx-0 mx-4"
      >
        <div>
          <DropdownFilter :name="selectedTeam" @open="openTeamDropdown" />
          <div
            v-if="openTeam"
            class="absolute mt-2 bg-white rounded shadow w-full md:w-[196px] p-2 md:mb-0 mb-20"
          >
            <div v-for="(i, index) in options" :key="index">
              <p
                class="hover:bg-gray-100 cursor-pointer px-2 py-2 uppercase text-xs md:text-sm"
                @click="selectTeam(i)"
              >
                {{ i }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DropdownFilter :name="selectedYear" @open="openYearDropdown" />
          <div
            v-if="openYear"
            class="absolute mt-2 bg-white rounded shadow w-full md:w-[196px] p-2"
          >
            <div v-for="(i, index) in years" :key="index">
              <p class="hover:bg-gray-100 cursor-pointer text-sm px-2 py-2" @click="selectYear(i)">
                {{ i }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DropdownFilter :name="selectedCompetition" @open="openCompetitionDropdown" />
          <div
            v-if="opencompetition"
            class="absolute mt-2 bg-white rounded shadow w-full md:w-[196px] p-2"
          >
            <div v-for="(competition, index) in competitions" :key="index">
              <p
                class="hover:bg-gray-100 cursor-pointer text-sm px-2 py-2 capitalize"
                @click="selectCompetition(competition)"
              >
                {{ competition }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-6 md:py-20">
      <!-- <KeepAlive> -->
      <component :is="activeComponent" :filters="filters" />
      <!-- </KeepAlive> -->
    </div>
  </div>
</template>
<style scoped></style>
