<script setup lang="ts">
const props = defineProps<{ image?: string; headline?: string }>()
</script>
<template>
  <div class="border border-[#D9D9D9] w-[318px] h-[301px]">
    <div class="flex flex-col gap-4 m-4 w-[286px]">
      <div v-if="props.image === ''" class="bg-[#D9D9D9] w-full h-[205px]"></div>
      <img :src="props.image" class="h-[205px] object-cover" v-else />
      <div class="text-[15px] font-zalando text-[#595959] font-normal h-auto text-box w-[286px]">
        {{ props.headline }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-box {
  white-space: normal;
  word-wrap: break-word;
}
</style>
