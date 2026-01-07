<script setup lang="ts">
import { reactive } from 'vue'
import TrainingCard from './TrainingCard.vue'
import RegistrationButton from '../common/RegistrationButton.vue'
const trainingData = reactive([
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },

  {
    image: 'trainingBuild.png',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
])
</script>
<template>
  <div class="bg-[#F5F6F7] relative">
    <div class="md:px-0 px-6 py-10 md:py-24 z-20">
      <div class="flex flex-col justify-center items-center pb-10 md:pb-[84px]">
        <div
          class="uppercase text-[18px] md:text-[36px] font-zalando font-medium text-[#1F1F1F] text-center"
        >
          Start Your Football Journey With JOFSA
        </div>
        <div class="text-[#595959] font-zalando text-sm md:text-[20px] text-center">
          Join a development pathway built to turn raw talent into real opportunity.
        </div>
        <RegistrationButton
          class="bg-[#318750] text-white mt-[24.32px]"
          text="Register for our academy "
        />
      </div>
      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div v-for="(data, index) in trainingData" :key="index">
            <div class="flex flex-col gap-4">
              <TrainingCard :image="data.image" :headline="data.headlines" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 z-0">
      <img src="/assets/images/Pattern.png" alt="bg pattern" />
    </div>
  </div>
</template>
