<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
import { reactive } from 'vue'
const columns = reactive(['pos', 'team', 'P', 'W', 'D', 'L', 'GF', 'GA', '+/-', 'Pts'])
</script>
<template>
  <div class="px-4 md:px-0 overflow-x-auto md:border-none border border-[#E1E1E1] rounded-lg">
    <table
      class="table-auto w-full min-w-[700px] border-collapse border border-[#E1E1E1] font-zalando md:my-0 my-4"
    >
      <thead class="">
        <tr class="h-14 bg-[#1F1F1F]">
          <th
            class="font-semibold text-[#FAFBFB] text-lg md:text-[22px] font-zalando text-left uppercase py-3 pl-4"
            colspan="11"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-[#EBEDF0] h-[52px]">
          <td
            class="p-4 text-[#262626] md:text-base text-sm font-medium capitalize"
            v-for="col in columns"
            :key="col"
          >
            {{ col }}
          </td>
        </tr>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
