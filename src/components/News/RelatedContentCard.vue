<script setup lang="ts">
const props = defineProps<{
  type: string
  image: string
  category: string
  title: string
  description: string
  time: string
}>()
</script>
<template>
  <article class="bg-white shadow-sm font-zalando border border-[#F0F0F0]">
    <div class="w-full overflow-hidden">
      <img
        :src="'/assets/images/' + props.image"
        alt="article image"
        class="w-full object-cover h-[171px]"
      />
    </div>
    <div class="px-6">
      <div class="text-[13px] text-[#D10303] font-semibold uppercase mt-6">
        {{ props.category }}
      </div>
      <div class="pt-2">
        <div class="text-[16px] text-[#262626] font-semibold">{{ props.title }}</div>
        <div class="text-sm text-[#595959] font-normal pt-2">{{ props.description }}</div>
      </div>
      <div class="pt-10 pb-8 text-[12px] text-[#595959]">{{ props.time }}</div>
    </div>
  </article>
</template>
