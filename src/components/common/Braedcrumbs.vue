<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  return route.matched.map((r) => {
    let label = r.meta?.breadcrumb as string

    // Dynamic player name
    if (r.name === 'player-profile' && route.params.name) {
      label = String(route.params.name)
    }

    return {
      label,
      path: router.resolve({
        name: r.name!,
        params: route.params,
      }).href,
    }
  })
})
</script>

<template>
  <nav class="font-zalando text-sm text-[#1F1F1F]">
    <ul class="flex items-center space-x-2">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <!-- NOT LAST -->
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-[#FFFFFF99]"
        >
          {{ crumb.label }}
        </router-link>

        <!-- LAST (ACTIVE) -->
        <span v-else class="text-[#FFFFFF99] font-semibold">
          {{ crumb.label }}
        </span>

        <!-- SEPARATOR -->
        <span v-if="index !== breadcrumbs.length - 1" class="mx-2 text-[#FFFFFF99]">
          <ChevronRightIcon class="h-4 w-4" />
        </span>
      </li>
    </ul>
  </nav>
</template>
