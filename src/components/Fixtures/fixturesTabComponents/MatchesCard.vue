<script setup lang="ts">
const props = defineProps<{
  date: string
  leagueName: string
  leagueLogo: string
  homeTeam: string
  homeTeamLogo: string
  time: string
  awayTeam: string
  awayTeamLogo: string
  stadium: string
}>()
</script>
<template>
  <div class="bg-white shadow-sm border-t-4 border-t-[#78B78F]">
    <div class="text-[22px] flex justify-between items-center p-8">
      <div>
        <p class="text-[#262626] font-semibold text-base">{{ props.date }}</p>
        <p class="text-[#595959] text-[12px] font-normal uppercase">
          {{ props.leagueName }}
        </p>
      </div>
      <div><img :src="props.leagueLogo" alt="League Logo" class="h-16 w-16" /></div>
    </div>
    <div class="px-8">
      <div class="py-4 flex justify-between items-center space-x-4 px-0 md:px-[47px] pt-10">
        <div class="flex space-x-2 items-center">
          <div class="text-[#262626] font-semibold text-sm md:text-base uppercase">
            {{ props.homeTeam }}
          </div>
          <div><img :src="props.homeTeamLogo" alt="Home Team Logo" class="h-16 w-16" /></div>
        </div>
        <div class="flex flex-col space-y-1">
          <div
            class="bg-[#F7B1B1] flex justify-center items-center px-2 md:px-3 py-1 md:py-2 h-9 md:h-12 rounded-sm"
          >
            <p class="text-[#262626] font-semibold text-base md:text-xl">
              {{ props.time }}
            </p>
          </div>
          <p class="text-[#595959] text-[12px] font-normal text-center text-sm uppercase pt-1">
            vs
          </p>
        </div>
        <div class="flex space-x-2 items-center">
          <div><img :src="props.awayTeamLogo" alt="Away Team Logo" class="h-16 w-16" /></div>
          <div class="text-[#262626] font-semibold text-sm md:text-base uppercase">
            {{ props.awayTeam }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-[#DFE2E6] mx-4 pt-6"></div>
    <div class="flex justify-center items-center text-sm font-normal py-8 uppercase">
      {{ props.stadium }}
    </div>
  </div>
</template>
