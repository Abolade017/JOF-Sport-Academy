<script setup lang="ts">
import RegistrationButton from '../common/RegistrationButton.vue'
</script>

<template>
  <div class="bg-[#F5F6F7] w-full h-[278px] font-zalando">
    <section class="w-full md:max-w-[1216px] mx-auto h-full flex items-center">
      <div class="relative h-auto md:h-[198px] px-0 md:mx-[84px]">
        <img
          src="/assets/images/Vector.png"
          alt="Football academy"
          class="w-full md:w-[469.32px]"
        />
        <div
          class="bg-[url(/assets/images/darkgreenbg.png)] absolute left-[110px] md:left-[400px] bottom-0 w-[250px] md:w-full h-full"
        ></div>
        <div
          class="absolute h-full bottom-0 left-[110px] md:left-[410px] bg-[url(/assets/images/greenBgImage.png)] w-[250px] md:w-[634px] bg-no-repeat"
        >
          <div class="text-white py-2 md:py-6 pl-4 md:pl-[74px]">
            <h2 class="text-sm md:text-[22px] font-medium mb-1">
              START YOUR FOOTBALL JOURNEY WITH JOFSA
            </h2>

            <p class="text-[10px] md:text-base mb-6 text-white">
              Join a development pathway built to turn raw talent into real opportunity.
            </p>
            <RegistrationButton
              text="REGISTER FOR OUR ACADEMY"
              class="bg-white text-[#2f6b3f]"
              linkUrl="https://jayteeojo.atlassian.net/servicedesk/customer/portal/2/create/8 "
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.gradient {
  background: linear-gradient(to right, #318750 42.07%, #173e25 100%);
}
</style>
background: linear-gradient(90deg, #318750 42.07%, #173E25 100%);
