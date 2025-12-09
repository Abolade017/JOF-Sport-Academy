<template>
  <div>
    <nav class="bg-[#1A337A]">
      <div class="flex justify-between items-center gap-4 px-8 py-5 max-w-[1250px] mx-auto">
        <div>
          <img src="/assets/images/home/logo.svg" alt="sport acadamy logo" />
        </div>
        <div>
          <ul class="inline-flex">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                to="link.to"
                class="text-white font-semibold text-sm px-4 py-1.5 uppercase"
                >{{ link?.name }}</RouterLink
              >
            </li>
          </ul>
        </div>

        <button class="font-semibold text-sm text-[#2C54CA] bg-white px-4 py-2">Register</button>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
const links = [
  { name: 'News', to: '/' },
  { name: 'Fixtures & results', to: '/about' },
  { name: 'Teams', to: '/contact' },
  { name: 'videos', to: '/contact' },
  { name: 'The Academy', to: '/contact' },
  { name: 'Contact us', to: '/contact' },
]
</script>

<style scoped></style>
