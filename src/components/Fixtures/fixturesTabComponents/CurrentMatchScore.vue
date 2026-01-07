<script setup lang="ts">
const props = defineProps<{
  class: string
  homeTeamScore: string
  awayTeamScore: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  leagueName: string
  LeagueLogo: string
  homeTeamLogo: string
  awayTeamLogo: string
  stadium: string
  status: string
}>()
</script>
<template>
  <div :class="props.class + ' font-zalando w-full'">
    <div class="flex justify-between items-center p-6">
      <div class="flex flex-col space-y-1">
        <div class="uppercase font-bold text-[#262626] text-sm">{{ props.date }}</div>
        <div class="uppercase text-xs font-normal text-[#595959]">{{ props.leagueName }}</div>
      </div>
      <div><img :src="props.LeagueLogo" alt="League Logo" /></div>
    </div>
    <div class="flex justify-between items-center space-x-6 px-[45.5px] pt-10 md:pt-20 h-fit">
      <div class="md:w-16 md:h-16 h-10 w-10">
        <img :src="props.homeTeamLogo" alt="Home Team Logo" class="md:h-16 md:w-16 h-10 w-10" />
      </div>
      <div
        v-if="props.status === 'not started'"
        class="bg-[#F7B1B1] px-1.5 md:px-4 py-1 md:py-4 h-10 md:h-16 w-14 md:w-[90px] text-[#262626] text-base md:text-[28px] font-semibold flex justify-center items-center"
      >
        {{ props.time }}
      </div>
      <div
        v-else-if="props.status === 'live'"
        class="bg-[#F7B1B1] px-1.5 md:px-3 py-1 md:py-2 h-10 md:h-16 w-14 md:w-[90px] text-[#262626] text-base md:text-[28px] font-semibold flex justify-center items-center"
      >
        {{ props.homeTeamScore }} - {{ props.awayTeamScore }}
      </div>
      <div
        v-else-if="props.status === 'finished'"
        class="bg-[#F7B1B1] px-1.5 md:px-3 py-1 md:py-2 h-10 md:h-16 w-14 md:w-[90px] text-[#262626] text-base md:text-[28px] font-semibold flex justify-center items-center"
      >
        {{ props.homeTeamScore }} - {{ props.awayTeamScore }}
      </div>
      <div>
        <img :src="props.awayTeamLogo" alt="Away Team Logo" class="md:h-16 md:w-16 h-10 w-10" />
      </div>
    </div>

    <div class="flex justify-between items-center mx-[25px] pt-2">
      <div class="w-[106px] text-[#262626] text-[13px] font-semibold uppercase">
        {{ props.homeTeam }}
      </div>

      <div class="text-xs md:text-sm text-[#262626] uppercase h-4 w-5 text-center mr-3">vs</div>

      <div class="text-[#262626] text-[13px] font-semibold uppercase w-[87px]">
        {{ props.awayTeam }}
      </div>
    </div>
    <div class="border-b border-b-[#C2C7D0] pt-6 mx-6"></div>
    <div class="flex justify-center items-center text-sm font-normal py-7 uppercase">
      {{ props.stadium }}
    </div>
  </div>
</template>
