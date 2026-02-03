<script setup lang="ts">
import { computed } from 'vue'
import { PlayerProfile } from '../../stores/PlayerProfileStore'
const props = defineProps<{ player: PlayerProfile | null }>()
const fullName = computed(() =>
  props.player ? `${props.player.first_name} ${props.player.last_name}` : '',
)
</script>
<template>
  <div class="px-10">
    <div v-if="props.player" class="space-y-4 font-zalando">
      <div class="text-lg font-bold text-[#1F1F1F] font-zalando-condensed uppercase pb-6">
        biography
      </div>
      <div class="flex flex-col gap-4 text-[#595959]">
        <div class="flex space-x-[46px]">
          <div class="twxt-[13px] font-semibold font-zalando">Date of Birth:</div>
          <div class="font-zalando font-light text-base">29 September 2000</div>
        </div>
        <div class="flex space-x-[58px]">
          <div class="twxt-[13px] font-semibold font-zalando">Nationality:</div>
          <div class="font-zalando font-light text-base">{{ props.player.nationality }}</div>
        </div>
      </div>
      <div
        class="pt-6 text-[#595959] font-zalando font-normal text-base whitespace-pre-line leading-7"
      >
        <p>
          <span class="capitalize">{{ fullName }}</span> has cemented himself as one of the best
          goalkeepers around after picking up back-to-back Premier League Golden Glove awards.
        </p>
        <br />
        <p>
          Having initially joined us from Brentford on loan in 2023, David made his switch from west
          London permanent in summer 2024.
        </p>
        <br />
        <p>
          The Barcelona-born stopper was an ever-present in 2024/25 in the Premier League, winning
          the Save of the Month on two occasions in August 2024 and March 2025. In 2023/24, David
          was named in PFA Team of the Season as well as saving two penalties in the shootout
          against Porto in the Champions League round of 16.
        </p>
        <br />
        <p>
          The experienced keeper, who is renowned for his catching ability when coming for crosses,
          calmness under pressure and precise passing, arrived in England in 2012, at the age of 16,
          when he joined Blackburn Rovers’ academy.
        </p>
        <br /> 
        <p>
          He played on loan at Southport in the National League before helping Rovers to promotion
          from League One in 2018.
        </p>
        <br />
        <p>
          A year later he joined Brentford, winning the Championship Golden Glove award in 2019/20,
          and was a key player as the Bees won promotion to the Premier League in 2021. 
        </p>
        <br />
        He won his first cap for Spain in March 2022 and was a member of the 2022 World Cup squad,
        before playing one group game – keeping a clean sheet – as Spain triumphed at Euro 2024.
      </div>
    </div>
    <div v-else class="flex items-center justify-center text-[#595959]">
      Player data not available
    </div>
  </div>
</template>
