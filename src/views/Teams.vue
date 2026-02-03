<script setup lang="ts">
import { computed, KeepAlive, onMounted, ref, watch } from 'vue'
import DropdownFilter from '../components/home/DropdownFilter.vue'
import SubHeader from '../components/common/SubHeader.vue'
import Players from '../components/JOFSAQueens/Players.vue'
import Table from '../components/JOFSAQueens/Table.vue'
import Stats from '../components/JOFSAQueens/Stats.vue'
import Achievements from '../components/JOFSAQueens/Achievements.vue'
import { useTeamStore } from '../stores/useTeamStore'
import { useTeamNameStore } from '../stores/TeamStore'
import { useLeaguetableStore } from '../stores/UseLeagueTable'
const tabs = [{ name: 'players' }, { name: 'table' }, { name: 'stats' }, { name: 'achievements' }]
const activeTab = ref('players')
const openDropdown = ref(false)
const team = ref('Arsenal')
const openYear = ref(false)
const selectedYear = ref('2025/26')
const selectedTeam = ref('Arsenal')
function openTeamDropdown() {
  openDropdown.value = !openDropdown.value
}
const years = ['2025/2026', '2026/2027']
const openYearDropdown = () => {
  openYear.value = !openYear.value
}
const selectYear = (option: string) => {
  selectedYear.value = option
  openYear.value = false
}
const options = computed(() => {
  return teamNameStore.teams
})
const selectTeam = (option: string) => {
  selectedTeam.value = option
  openDropdown.value = false
}
const store = useTeamStore()
const leagueTableStore = useLeaguetableStore()
const teamNameStore = useTeamNameStore()
onMounted(async () => {
  await teamNameStore.fetchTeam()
  // await leagueTableStore.fetchLeagueTable()
})
const filters = computed(() => {
  return {
    team: selectedTeam.value ? selectedTeam.value.toLowerCase().replace(/\s+/g, '-') : undefined,
    year: selectedYear.value ? Number(selectedYear.value.split('/')[0]) : undefined,
  }
})
const componentMap: any = {
  players: Players,
  table: Table,
  stats: Stats,
  achievements: Achievements,
}
</script>
<template>
  <SubHeader :headerName="selectedTeam" />
  <div class="max-w-[1250px] mx-auto">
    <div
      class="flex flex-col space-y-8 md:flex-row md:justify-between space-x-0 md:space-x-3 items-center py-4 font-zalando mx-4 md:mx-0"
    >
      <div class="flex items-center justify-between space-x-9 md:space-x-6">
        <div v-for="(tab, index) in tabs" :key="index">
          <div
            :class="
              activeTab === tab.name
                ? 'uppercase text-[#369458] underline  decoration-4 decoration-[#369458]  underline-offset-20 text-xs md:text-sm cursor-pointer'
                : 'uppercase text-[#8C8C8C] text-xs md:text-sm cursor-pointer'
            "
            @click="activeTab = tab.name"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
      <div class="flex space-x-4">
        <div>
          <DropdownFilter :name="selectedTeam" @open="openTeamDropdown" />
          <div
            v-if="openDropdown"
            class="absolute mt-2 bg-white rounded shadow w-32 md:w-[196px] p-2"
          >
            <div v-for="i in options" :key="i.id">
              <p
                class="hover:bg-gray-100 cursor-pointer px-2 py-2 uppercase text-xs md:text-sm"
                @click="selectTeam(i.name)"
              >
                {{ i.name }}
              </p>
            </div>
          </div>
        </div>
        <div :class="activeTab === 'table' ? 'inline-flex' : 'hidden'">
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
      </div>
    </div>
  </div>
  <KeepAlive>
    <component
      :is="componentMap[activeTab]"
      :loading="store.loading"
      :team="selectedTeam"
      :filters="filters"
      class="py-6 md:py-24"
    />
  </KeepAlive>
</template>
