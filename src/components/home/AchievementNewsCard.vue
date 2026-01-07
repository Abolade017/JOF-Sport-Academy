<script setup lang="ts">
const props = defineProps<{ title: string; description: string; image: string }>()
</script>
<template>
  <div class="bg-[#FCFCFC] w-full md:w-[405.33px] h-32 border border-[#D9D9D9] font-zalando">
    <div class="flex space-x-4 items-center p-5">
      <div><img :src="props.image" alt="achievement image" /></div>
      <div class="flex flex-col gap-2">
        <div class="text-[#D10303] text-[13px] font-semibold capitalize">{{ props.title }}</div>
        <div class="text-[#262626] text-sm md:text-[18px] font-semibold capitalize">
          {{ props.description }}
        </div>
      </div>
    </div>
  </div>
</template>
