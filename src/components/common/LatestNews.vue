<script setup lang="ts">
const props = defineProps<{ image: string; title: string }>()
</script>
<template>
  <div class="flex flex-col space-y-3">
    <div>
      <img :src="props.image" alt="latest news image" class="object-cover w-full h-[227px]" />
    </div>
    <div class="text-[#262626] font-semibold font-zalando text-lg uppercase">{{ props.title }}</div>
  </div>
</template>
