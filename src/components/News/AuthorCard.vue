<template>
  <div class="border-b border-[#D9D9D9] shadow-md w-full font-zalando">
    <div class="flex justify-between pb-6 space-x-10 md:space-x-[339px]">
      <div class="flex space-x-2">
        <div><img :src="props.authorImage" alt="Author" /></div>
        <div class="flex flex-col gap-1">
          <div class="text-[#333333] font-zalando text-[13px] font-semibold uppercase leading-4">
            By {{ props.author }}
          </div>
          <div class="text-[#595959] text-[13px] font-normal laeding-5">
            {{ props.readMin }} mins read
          </div>
        </div>
      </div>
      <div class="flex space-x-2">
        <div v-for="(socialMedia, index) in props.socialMedia" :key="index">
          <a
            :href="socialMedia.url"
            class="h-10 w-10 border border-[#D9D9D9] flex justify-center items-center"
          >
            <font-awesome-icon
              :icon="socialMedia.icon"
              class="text-black h-full w-full items-center"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  author: string
  authorImage: string
  readMin: string
  socialMedia: Array<{ icon: any; url: string }>
}>()
</script>
