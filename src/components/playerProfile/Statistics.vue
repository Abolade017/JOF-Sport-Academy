<script setup lang="ts">
import type { PlayerProfile } from '@/types/PlayerProfile'
const props = defineProps<{ player: PlayerProfile | null }>()
</script>
<template>
  <div class="px-6 md:px-10">
    <div class="text-lg font-bold text-[#1F1F1F] font-zalando-condensed uppercase pb-6">
      statistics
    </div>
    <div class="pt-6 flex md:flex-row flex-col md:gap-x-24 gap-x-0 md:gap-y-0 gap-y-4">
      <div class="flex flex-col gap-2 w-full md:w-[325.5px]">
        <div class="uppercase font-zalando-condensed text-[#1F1F1F] font-bold text-lg">attack</div>
        <table class="font-zalando text-[13px] text-[#595959] border-separate border-spacing-y-4">
          <tbody class="">
            <tr class="w-[220px]">
              <td class="font-semibold">Goals:</td>
              <td class="font-light">8</td>
            </tr>
            <tr>
              <td class="font-semibold">Headed Goals:</td>
              <td class="font-light">0</td>
            </tr>
            <tr>
              <td class="font-semibold">Penalty Goals:</td>
              <td class="font-light">1</td>
            </tr>
            <tr>
              <td class="font-semibold">Total Shots:</td>
              <td class="font-light">48</td>
            </tr>
            <tr>
              <td class="font-semibold">Shots on target:</td>
              <td class="font-light">30</td>
            </tr>
            <tr>
              <td class="font-semibold">Hit Woodwork:</td>
              <td class="font-light">1</td>
            </tr>
            <tr>
              <td class="font-semibold">Goals Per Match:</td>
              <td class="font-light">0.24</td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="flex flex-col gap-y-4">
          <div class="flex space-x-"></div> -->
        <!-- </div> -->
      </div>
      <div class="flex flex-col gap-2 w-full md:w-[325.5px]">
        <div class="uppercase font-zalando-condensed text-[#1F1F1F] font-bold text-lg">
          distribution
        </div>
        <table class="font-zalando text-[13px] text-[#595959] border-separate border-spacing-y-4">
          <tbody class="">
            <tr class="w-[220px]">
              <td class="font-semibold capitalize">Goal Assits:</td>
              <td class="font-light">8</td>
            </tr>
            <tr>
              <td class="font-semibold capitalize">second assists:</td>
              <td class="font-light">0</td>
            </tr>
            <tr>
              <td class="font-semibold capitalize">total passes:</td>
              <td class="font-light">1</td>
            </tr>
            <tr>
              <td class="font-semibold capitalize">through balls:</td>
              <td class="font-light">48</td>
            </tr>
            <tr>
              <td class="font-semibold capitalize">Successful crosses and corners:</td>
              <td class="font-light">30</td>
            </tr>
            <tr>
              <td class="font-semibold capitalize">passes per match:</td>
              <td class="font-light">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
