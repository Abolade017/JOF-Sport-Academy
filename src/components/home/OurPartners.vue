<script setup lang="ts">
import { reactive } from 'vue'

const officialPartnersLogo = reactive([
  { logo: '/assets/images/fifa.png' },
  { logo: '/assets/images/ekitiState.png' },
])
</script>
<template>
  <div
    class="flex justify-center items-center h-[255px] md:h-[439.68px] max-w-[1216px] mx-auto"
    id="partners"
  >
    <div class="h-full flex items-center">
      <div class="w-full md:w-[304.68px]">
        <div
          class="uppercase text-[#1F1F1F] font-medium text-[20px] md:text-[32px] text-center flex justify-center items-center"
        >
          OUR PARTNERS
        </div>
        <div class="flex items-center space-x-20 justify-center mt-6 md:mt-10">
          <div v-for="(partner, index) in officialPartnersLogo" :key="index">
            <img
              :src="partner.logo"
              alt="Official Partner logo"
              class="md:h-auto h-14 md:w-auto w-14"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
