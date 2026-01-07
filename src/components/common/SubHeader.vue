<script setup lang="ts">
const props = defineProps<{ headerName: string }>()
</script>
<template>
  <div class="w-full py-6 bg-fixtures-header h-20 md:h-[106px]">
    <div
      class="text-white font-zalando font-bold text-3xl md:text-[46px] uppercase flex items-center w-full mx-auto max-w-[1250px] md:px-0 px-4"
    >
      {{ props.headerName }}
    </div>
  </div>
</template>
