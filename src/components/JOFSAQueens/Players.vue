<script setup lang="ts">
import { computed } from 'vue'
import PlayerCard from './PlayerCard.vue'
import { players } from '@/data'
const goalKeepers = computed(() => players[0]?.goalKeepers)
const defenders = computed(() => players[0]?.defenders)
const midFielders = computed(() => players[0]?.midFielders)
const attackers = computed(() => players[0]?.attackers)
</script>

<template>
  <div class="max-w-[1250px] mx-auto">
    <div
      class="text-[#1F1F1F] text-lg md:text-3xl font-bold uppercase font-zalando pb-3 md:pb-6 md:px-0 px-4"
    >
      goalkeeper
    </div>
    <div class="flex flex-wrap space-y-4">
      <div v-for="(keeper, index) in goalKeepers" :key="index" class="w-1/2 md:w-1/3 md:px-0 px-4">
        <PlayerCard
          :firstName="keeper.firstName"
          :lastName="keeper.lastName"
          :shirtNumber="keeper.shirtNumber"
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
      <div class="flex flex-wrap space-y-4">
        <div
          v-for="(defender, index) in defenders"
          :key="index"
          class="w-1/2 md:w-1/3 md:px-0 px-4"
        >
          <PlayerCard
            :firstName="defender.firstName"
            :lastName="defender.lastName"
            :shirtNumber="defender.shirtNumber"
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
      <div class="flex flex-wrap space-y-4">
        <div
          v-for="(midFielder, index) in midFielders"
          :key="index"
          class="w-1/2 md:w-1/3 md:px-0 px-4"
        >
          <PlayerCard
            :firstName="midFielder.firstName"
            :lastName="midFielder.lastName"
            :shirtNumber="midFielder.shirtNumber"
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
      <div class="flex flex-wrap space-y-4">
        <div
          v-for="(attacker, index) in attackers"
          :key="index"
          class="w-1/2 md:w-1/3 md:px-0 px-4"
        >
          <PlayerCard
            :firstName="attacker.firstName"
            :lastName="attacker.lastName"
            :shirtNumber="attacker.shirtNumber"
            :photo="attacker.photo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
