<script setup lang="ts">
import { ArrowLongUpIcon, ArrowUpIcon } from '@heroicons/vue/16/solid'
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faXTwitter,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
const links = ['Privacy Policy', 'cookie Policy', 'Terms & Conditions']
const teams = ['king', 'princes', 'kids', 'queen']
const extraLinks = ['register', 'contact us', 'our programs', 'partners']
const socialMediaLinks = [faWhatsapp, faFacebook, faTiktok, faYoutube, faInstagram, faXTwitter]
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>
<template>
  <div class="bg-[#26693E] font-zalando">
    <div class="max-w-[1250px] mx-auto py-12 md:py-24">
      <div class="flex md:flex-row flex-col space-y-6 md:justify-between px-4 md:px-0">
        <div class="flex flex-col sapce-y-3">
          <img
            src="/assets/images/footerLogo.png"
            alt="sport acadamy logo"
            class="md:h-[143px] h-[100px] w-20 md:w-[129px] object-cover"
          />
          <div class="flex space-x-6 items-center pt-6">
            <font-awesome-icon
              v-for="icon in socialMediaLinks"
              :key="icon.iconName"
              :icon="icon"
              class="text-white h-6"
            />
          </div>
        </div>
        <div
          class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between space-x-0 md:space-x-16"
        >
          <div class="">
            <h6 class="uppercase text-white mb-2">Teams</h6>
            <div class="flex flex-col space-y-2">
              <div
                v-for="team in teams"
                :key="team"
                class="text-white text-base font-medium capitalize"
              >
                JOFSA {{ team }}
              </div>
            </div>
          </div>
          <div class="">
            <h6 class="uppercase text-white mb-2">Extra links</h6>
            <div class="flex flex-col space-y-2">
              <div
                v-for="link in extraLinks"
                :key="link"
                class="text-white text-base font-medium capitalize"
              >
                {{ link }}
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <button
            @click="scrollToTop"
            class="uppercase text-white cursor-pointer flex items-center gap-2 pb-1 border-b border-white"
          >
            <span class=""> Back to the top</span>
            <div><ArrowLongUpIcon class="w-5 h-5 text-white" /></div>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-[#173E25] h-fit w-full">
      <div class="max-w-[1250px] mx-auto md:px-0 px-2 py-4">
        <div
          class="flex flex-col md:space-y-0 space-y-3 md:flex-row md:justify-between items-center"
        >
          <div
            class="text-white text-xs md:text-sm flex justify-center items-center space-x-2.5 md:space-x-4"
          >
            <div v-for="link in links" :key="link" class="uppercase">{{ link }}</div>
          </div>
          <div class="text-white text-sm">© 2025 Jaytee Ojo Sport Academy</div>
        </div>
      </div>
    </div>
  </div>
</template>
