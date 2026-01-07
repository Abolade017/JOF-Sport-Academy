<template>
  <div>
    <nav class="bg-white md:shadow none shadow-md relative">
      <div class="flex justify-between items-center gap-4 py-5 max-w-[1250px] mx-auto md:px-0 px-4">
        <div>
          <img
            src="/assets/images/home/logo.svg"
            alt="sport acadamy logo"
            class="h-14 w-20 md:w-auto md:h-auto"
          />
        </div>
        <div>
          <ul class="hidden md:inline-flex">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-[#369458] font-semibold text-sm px-4 py-1.5 uppercase"
                >{{ link.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <button class="hidden md:block font-semibold text-sm text-white bg-[#369458] px-4 py-2">
          Register
        </button>
        <div v-if="mobile" class="absolute top-full right-0 w-60 bg-white shadow-md py-4 md:hidden">
          <ul class="flex flex-col gap-y-4">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-[#369458] font-semibold text-sm px-4 py-1.5 uppercase"
                >{{ link.name }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="flex justify-center items-center mr-10 md:hidden">
          <button class="font-semibold text-sm text-white bg-[#369458] p-2 w-fit">Register</button>
        </div>
        <div class="md:hidden">
          <Bars3Icon
            @click="mobile = true"
            class="h-10 w-10 text-[#369458] cursor-pointer"
            v-if="mobile === false"
          />
          <XMarkIcon
            @click="mobile = false"
            class="h-10 w-10 text-[#369458] cursor-pointer"
            v-else
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bars3Icon from '@heroicons/vue/24/outline/Bars3Icon'
import { XMarkIcon } from '@heroicons/vue/16/solid'
const mobile = ref(false)
const links = [
  { name: 'News', to: '/' },
  { name: 'Fixtures & results', to: '/fixtures' },
  { name: 'Teams', to: '/teams' },
  { name: 'videos', to: '/contact' },
  { name: 'The Academy', to: '/contact' },
  { name: 'Contact us', to: '/contact' },
]
</script>

<style scoped></style>
