<script setup lang="ts">
const props = defineProps<{ image: string; headline: string }>()
</script>
<template>
  <div class="border border-[#D9D9D9] w-[318px]">
    <div class="flex flex-col gap-4 m-4">
      <div v-if="props.image === ''" class="bg-[#D9D9D9] h-[205px] w-[286px]">
        <!-- <div ></div> -->
      </div>
      <img
        :src="'/assets/images/' + props.image"
        class="w-full h-full object-cover rounded-lg"
        v-else
      />
      <div>{{ props.headline }}</div>
    </div>
  </div>
</template>
