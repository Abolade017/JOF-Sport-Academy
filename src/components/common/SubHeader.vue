<script setup lang="ts">
const props = defineProps<{ headerName: string }>()
</script>
<template>
  <div
    class="w-full py-6 h-20 md:h-[106px] bg-[url('/assets/images/HeaderBg.png')] bg-cover bg-no-repeat bg-[#26693E]"
  >
    <div
      class="text-white font-zalando font-bold text-3xl md:text-[46px] uppercase flex items-center w-full mx-auto max-w-[1250px] md:px-0 px-4"
    >
      {{ props.headerName }}
    </div>
  </div>
  <!-- bg-fixtures-header -->
</template>
