<template>
  <section class="bg-white">
    <div class="max-w-[1216px] mx-auto px-6 lg:px-9 py-16 bg-[#030714]">
      <h1 class="uppercase text-white text-4xl font-semibold tracking-tight mb-12">Our teams</h1>

      <div class="flex flex-col gap-y-6 max-w-[1140px] mx-auto">
        <div class="grid gap-6 md:grid-cols-[60%auto]">
          <article
            v-for="team in teams"
            :key="team.title"
            class="group relative overflow-hidden rounded-lg border border-[#11182f] bg-[#0a122b]"
          >
            <img
              :src="team.image"
              :alt="team.title"
              class="h-[340px] w-full object-cover transform transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80"
            ></div>

            <div class="absolute bottom-5 left-5 text-white text-lg font-extrabold uppercase">
              {{ team.title }}
            </div>
          </article>
        </div>

        <div class="grid gap-6 md:grid-cols-[40%auto]">
          <article
            v-for="team in teams1"
            :key="team.title"
            class="group relative overflow-hidden rounded-lg border border-[#11182f] bg-[#0a122b]"
          >
            <img
              :src="team.image"
              :alt="team.title"
              class="h-[340px] w-full object-cover transform transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80"
            ></div>

            <div class="absolute bottom-5 left-5 text-white text-lg font-extrabold uppercase">
              {{ team.title }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const teams = [
  {
    title: 'JOFSA Kids - Under 10',
    image: '/assets/images/home/player1.png',
  },
  {
    title: 'JOFSA Kings - Under 19',
    image: '/assets/images/home/player1.png',
  },
]

const teams1 = [
  {
    title: 'JOFSA Kids – Under 10',
    image: '/assets/images/home/player1.png',
  },
  {
    title: 'JOFSA Kings – Under 19',
    image: '/assets/images/home/player1.png',
  },
]
</script>

<style scoped></style>
