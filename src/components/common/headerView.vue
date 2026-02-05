<template>
  <div class="font-zalando">
    <div class="bg-[#369458] h-fit">
      <div
        class="max-w-[1250px] mx-auto flex md:flex-row flex-col justify-between items-center h-full"
      >
        <div class="flex space-x-5 items-center h-full">
          <div v-for="(header, index) in headers" :key="index">
            <routerLink
              :to="header.url"
              class="text-[#FDFDFDE5] text-xs md:text-[13px] font-semibold uppercase"
              >{{ header.name }}</routerLink
            >
          </div>
        </div>
        <div class="flex space-x-10 md:space-x-6 items-center h-full md:py-0 py-3">
          <font-awesome-icon
            v-for="icon in socialMediaLinks"
            :key="icon.iconName"
            :icon="icon"
            class="text-white h-6"
          />
        </div>
      </div>
    </div>
    <nav class="bg-[#1E5130] md:shadow none shadow-md relative">
      <div class="flex justify-between items-center gap-4 py-5 max-w-[1250px] mx-auto md:px-0 px-4">
        <routerLink to="/">
          <img
            src="/assets/images/home/logo.svg"
            alt="sport acadamy logo"
            class="h-14 w-20 md:w-auto md:h-auto"
          />
        </routerLink>
        <div>
          <ul class="hidden md:inline-flex">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-white font-semibold text-sm px-4 py-1.5 uppercase"
                >{{ link.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <RouterLink
          to="/registration"
          class="hidden md:block font-semibold text-sm text-[#318750] bg-white px-4 py-2 uppercase"
        >
          Register
        </RouterLink>
        <div v-if="mobile" class="absolute top-full right-0 w-60 bg-white shadow-md py-4 md:hidden">
          <ul class="flex flex-col gap-y-4">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-[#318750] font-semibold text-sm px-4 py-1.5 uppercase"
                >{{ link.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="flex justify-center items-center mr-10 md:hidden">
          <RouterLink
            to="/registration"
            class="font-semibold text-sm text-[#369458] bg-white p-2 w-fit uppercase"
          >
            Register
          </RouterLink>
        </div>
        <div class="md:hidden">
          <Bars3Icon
            @click="mobile = true"
            class="h-10 w-10 text-white cursor-pointer"
            v-if="mobile === false"
          />
          <XMarkIcon @click="mobile = false" class="h-10 w-10 text-white cursor-pointer" v-else />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bars3Icon from '@heroicons/vue/24/outline/Bars3Icon'
import { XMarkIcon } from '@heroicons/vue/16/solid'
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faXTwitter,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
const socialMediaLinks = [faWhatsapp, faFacebook, faTiktok, faYoutube, faInstagram, faXTwitter]
const mobile = ref(false)
const links = [
  { name: 'News', to: '/news' },
  { name: 'Fixtures & results', to: '/fixtures' },
  { name: 'Teams', to: '/teams' },
  { name: 'videos', to: '/contact' },
  { name: 'The Academy', to: '/the-academy' },
  { name: 'Contact us', to: '/contact-us' },
]
const headers = [
  { name: 'About the academy', url: '/' },
  { name: 'partners', url: '/' },
  { name: 'support us', url: '/' },
]
</script>

<style scoped></style>
