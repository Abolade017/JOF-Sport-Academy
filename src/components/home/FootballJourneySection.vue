<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import TrainingCard from './TrainingCard.vue'
import RegistrationButton from '../common/RegistrationButton.vue'
import { useCarouselNews } from '../../stores/NewsCarouselStore'
const trainingData = reactive([
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },
  {
    image: '',
    headlines: 'U10 kids learning teamwork through fun, structured mini-games.',
  },
  {
    image: '',
    headlines: 'JOFSA players during JayTee Ojo Foundation early-morning training.',
  },

  {
    image: '/assets/images/trainingBuild.png',
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
const store = useCarouselNews()
onMounted(async () => {
  return await store.fetchCarousels()
})
const carousels = computed(() => store.carousels)
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
      <div class="relative overflow-hidden">
        <div class="flex animate-carousel whitespace-nowrap space-x-4">
          <!-- <div class="flex space-x-4"> -->
          <div v-for="carousel in carousels" :key="carousel.id">
            <!-- <div class="flex flex-col gap-4"> -->
            <TrainingCard
              :image="carousel.image_url"
              headline="JOFSA players during JayTee Ojo Foundation early-morning training.
"
            />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 z-0">
      <img src="/assets/images/Pattern.png" alt="bg pattern" />
    </div>
  </div>
</template>
<style scoped>
@keyframes carousel {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-carousel {
  animation: carousel 20s linear infinite;
}
</style>
