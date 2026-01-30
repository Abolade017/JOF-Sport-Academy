-
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import PlayerCard from './PlayerCard.vue'
import { useTeamStore } from '../../stores/useTeamStore'
import LoadingState from '../common/loadingState.vue'

const props = defineProps<{ team: string }>()
const store = useTeamStore()

// Fetch players whenever the selected team changes
watch(
  () => props.team,
  (team) => {
    if (team) store.fetchTeams(team)
  },
  { immediate: true },
)

// Computed players array (always reactive)
const players = computed(() => store.teams)

console.log(players)
// Filter by position
const goalKeepers = computed(() => players.value.filter((p) => p.position === 'Goal Keeper'))
const defenders = computed(() => players.value.filter((p) => p.position === 'Defender'))
const midFielders = computed(() => players.value.filter((p) => p.position === 'Midfielder'))
const forwards = computed(() => players.value.filter((p) => p.position === 'Forward'))
console.log(goalKeepers)
</script>

<template>
  <div class="max-w-[1250px] mx-auto">
    <div v-if="store.loading" class="flex space-x-4">
      <div class="animate-pulse bg-gray-300 h-[383px] w-[395px]" v-for="i in 3" :key="i"></div>
    </div>

    <div v-else-if="players.length === 0" class="text-center py-8">
      No players found for {{ props.team }}
    </div>
    <div v-else>
      <div
        class="text-[#1F1F1F] text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 md:px-0 px-4"
      >
        goalkeeper
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-4">
        <div v-for="keeper in goalKeepers" :key="keeper.id" class="w-1/2 md:w-1/3 md:px-0 px-4">
          <PlayerCard
            :id="keeper.id"
            :firstName="keeper.first_name"
            :lastName="keeper.last_name"
            :shirtNumber="keeper.jersey_number"
            :photo="keeper.photo"
          />
        </div>
      </div>
      <div class="pt-6">
        <div
          class="text-[#1F1F1F] text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 md:px-0 px-4"
        >
          Defenders
        </div>
        <div class="flex flex-wrap gap-4">
          <div v-for="defender in defenders" :key="defender.id" class="w-1/2 md:w-1/3 md:px-0 px-4">
            <PlayerCard
              :id="defender.id"
              :firstName="defender.first_name"
              :lastName="defender.last_name"
              :shirtNumber="defender.jersey_number"
              :photo="defender.photo"
            />
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div
          class="text-[#1F1F1F] text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 md:px-0 px-4"
        >
          Midfielders
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <div
            v-for="midFielder in midFielders"
            :key="midFielder.id"
            class="w-1/2 md:w-1/3 md:px-0 px-4"
          >
            <PlayerCard
              :id="midFielder.id"
              :firstName="midFielder.first_name"
              :lastName="midFielder.last_name"
              :shirtNumber="midFielder.jersey_number"
              :photo="midFielder.photo"
            />
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div
          class="text-[#1F1F1F] text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 md:px-0 px-4"
        >
          Attackers
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <div v-for="forward in forwards" :key="forward.id" class="w-1/2 md:w-1/3 md:px-0 px-4">
            <PlayerCard
              :id="forward.id"
              :firstName="forward.first_name"
              :lastName="forward.last_name"
              :shirtNumber="forward.jersey_number"
              :photo="forward.photo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <script setup lang="ts">
// import { computed, watch } from 'vue'
// import PlayerCard from './PlayerCard.vue'
// import { useTeamStore } from '../../stores/useTeamStore'

// const props = defineProps<{ team: string }>()
// const store = useTeamStore()

// watch(
//   () => props.team,
//   (team) => {
//     if (team) store.fetchTeams(team)
//   },
//   { immediate: true },
// )

// const players = computed(() => store.teams)

// console.log(players)
// const goalKeepers = computed(() => players.value.filter((p) => p.position === 'Goal Keeper'))
// const defenders = computed(() => players.value.filter((p) => p.position === 'Defender'))
// const midFielders = computed(() => players.value.filter((p) => p.position === 'Midfielder'))
// const forwards = computed(() => players.value.filter((p) => p.position === 'Forward'))
// console.log(goalKeepers)
</script>

<!--<template>-->
<!-- <div class="max-w-[1250px] mx-auto">
    <div v-if="store.loading" class="text-center py-8">Loading players...</div>

    <div v-else-if="players.length === 0" class="text-center py-8">
      No players found for {{ props.team }}
    </div>

    <div v-else>
      <div v-if="goalKeepers.length > 0">
        <div class="text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 px-4">
          Goalkeepers
        </div>
        <div class="flex flex-wrap space-x-4">
          <PlayerCard
            v-for="keeper in goalKeepers"
            :key="keeper.id"
            :id="keeper.id"
            :firstName="keeper.first_name"
            :lastName="keeper.last_name"
            :shirtNumber="keeper.jersey_number"
            :photo="keeper.photo"
          />
        </div>
      </div>

      <div v-if="defenders.length > 0" class="pt-6">
        <div class="text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 px-4">
          Defenders
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <PlayerCard
            v-for="defender in defenders"
            :key="defender.id"
            :id="defender.id"
            :firstName="defender.first_name"
            :lastName="defender.last_name"
            :shirtNumber="defender.jersey_number"
            :photo="defender.photo"
          />
        </div>
      </div>

      <div v-if="midFielders.length > 0" class="pt-6">
        <div class="text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 px-4">
          Midfielders
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <PlayerCard
            v-for="mid in midFielders"
            :key="mid.id"
            :id="mid.id"
            :firstName="mid.first_name"
            :lastName="mid.last_name"
            :shirtNumber="mid.jersey_number"
            :photo="mid.photo"
          />
        </div>
      </div>

      <div v-if="forwards.length > 0" class="pt-6">
        <div class="text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 px-4">
          Attackers
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <PlayerCard
            v-for="forward in forwards"
            :key="forward.id"
            :id="forward.id"
            :firstName="forward.first_name"
            :lastName="forward.last_name"
            :shirtNumber="forward.jersey_number"
            :photo="forward.photo"
          />
        </div>
      </div>
    </div>
  </div> -->
<!-- </template>-->
