<script setup lang="ts">
import SubHeader from '@/components/common/SubHeader.vue'
import DropdownFilter from '@/components/home/DropdownFilter.vue'
import Achievements from '@/components/JOFSAQueens/Achievements.vue'
import Players from '@/components/JOFSAQueens/Players.vue'
import Stats from '@/components/JOFSAQueens/Stats.vue'
import Table from '@/components/JOFSAQueens/Table.vue'
import { KeepAlive, ref } from 'vue'
const tabs = [{ name: 'players' }, { name: 'table' }, { name: 'stats' }, { name: 'achievements' }]
const activeTab = ref('players')
const openDropdown = ref(false)
const selectedTeam = ref('JOFSA Queens')
function openTeamDropdown() {
  openDropdown.value = !openDropdown.value
}
const options = ['JOFSA Queens', 'JOFSA Kings']

const selectTeam = (option: string) => {
  selectedTeam.value = option
  openDropdown.value = false
}
const componentMap: any = {
  players: Players,
  table: Table,
  stats: Stats,
  achievements: Achievements,
}
</script>
<template>
  <SubHeader headerName="JOFSA QUEENS" />
  <div class="max-w-[1250px] mx-auto">
    <div
      class="flex flex-col space-y-8 md:flex-row md:justify-between space-x-0 md:space-x-3 items-center py-4 font-zalando mx-4 md:mx-0"
    >
      <div class="flex items-center justify-between space-x-9 md:space-x-6">
        <div v-for="(tab, index) in tabs" :key="index">
          <div
            :class="
              activeTab === tab.name
                ? 'uppercase text-[#369458] underline  decoration-4 decoration-[#369458]  underline-offset-20 text-xs md:text-sm'
                : 'uppercase text-[#369458] text-xs md:text-sm'
            "
            @click="activeTab = tab.name"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
      <div>
        <DropdownFilter :name="selectedTeam" @open="openTeamDropdown" />
        <div
          v-if="openDropdown"
          class="absolute mt-2 bg-white rounded shadow w-32 md:w-[196px] p-2"
        >
          <div v-for="(i, index) in options" :key="index">
            <p
              class="hover:bg-gray-100 cursor-pointer px-2 py-2 capitalize text-xs md:text-sm"
              @click="selectTeam(i)"
            >
              {{ selectedTeam }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <KeepAlive>
    <component :is="componentMap[activeTab]" class="py-6 md:py-24"></component>
  </KeepAlive>
</template>
