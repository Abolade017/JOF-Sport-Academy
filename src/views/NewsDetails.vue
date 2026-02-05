<template>
  <div class="">
    <NewsDetailsCard
      v-if="detailNews"
      :type="categoryName"
      :title="detailNews.title"
      :date="formattedDate"
      :imageUrl="detailNews.thumbnail_url"
      :time="formatToTime(detailNews.published_at)"
      :imageCredit="newsItem.imageCredit"
    />
    <p
      class="text-[#595959] font-medium mt-1 md:mt-2 text-[11px] text-left md:text-right object-cover font-zalando md:ml-0 ml-4 mr-0 md:mr-10 uppercase"
    >
      Photo credit:
      {{ newsItem.imageCredit }}
    </p>
  </div>
  <div class="mt-[60px] :mt-[120px] mb-6 w-full px-0 md:px-[370px]">
    <AuthorCard
      :author="newsItem.author"
      :authorImage="newsItem.authorImage"
      :readMin="newsItem.readMin"
      :socialMedia="newsItem.socialMedia"
    />
  </div>

  <div class="w-full md:w-[877px] ml-4 md:ml-[130px]">
    <div
      class="text-base md:text-[28px] font-zalando font-light text-[#262626] leading-6 md:leading-11"
    >
      {{ newsItem.headline }}
    </div>
  </div>
  <div class="mx-auto w-full md:w-[700px]">
    <div
      class="flex justify-center font-extralight text-[#262626] font-zalando text-sm md:text-[20px] px-4 md:px-0 md:mt-10 mt-4"
    >
      <div v-html="newsItem.content"></div>

      <!-- <div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Elementum enim nisl lacus arcu duis nec posuere
          scelerisque. Mattis a fermentum tincidunt auctor. Quis pretium quis id nunc laoreet
          aliquam ultrices nulla arcu.
          <span>
            <div class="mt-4">
              Magna lorem aliquet nunc ultrices ante. Morbi suspendisse placerat eget pharetra
              nascetur elit at orci tristique. Placerat risus rutrum fringilla a volutpat ut fusce.
              Nec placerat amet id iaculis risus tellus commodo massa fames.
            </div>
          </span>
          <span>
            <div class="mt-4">
              Sit nisi ut viverra consequat proin. Velit faucibus consectetur arcu urna feugiat amet
              elit. Tincidunt neque volutpat eu senectus dignissim a mi vestibulum auctor. Nec
              aenean nunc eget at tincidunt enim quisque.
            </div>
          </span>
          <span>
            <div class="mt-4">
              Amet libero dignissim tellus varius tincidunt aliquet. Sit amet elementum mattis a
              pellentesque diam aliquam. Auctor sit pharetra adipiscing etiam urna rutrum.
              Vestibulum posuere quam commodo donec sapien semper rhoncus cras.
            </div>
          </span>
          <span>
            <div class="mt-4">
              At justo est orci eu neque enim. Pulvinar id interdum suscipit vitae elementum
              malesuada in. Ut vel vel at mi. Ac suspendisse ac elit aliquet pharetra massa aliquet
              vel penatibus. Turpis arcu in cursus nunc cursus sed faucibus faucibus.
            </div></span
          >
        </p>
      </div> -->
    </div>
  </div>
  <div class="mx-0 md:mx-[130px] my-8 md:my-16">
    <ArticleImage :src="newsItem.articleImage4" :imageCredit="newsItem.imageCredit" alt="photo" />
  </div>
  <div class="mx-auto md:w-[700px] w-full">
    <p class="text-sm md:text-[20px] text-[#262626] font-extralight font-zalando leading-[30px]">
      Lorem ipsum dolor sit amet consectetur. Elementum enim nisl lacus arcu duis nec posuere
      scelerisque. Mattis a fermentum tincidunt auctor. Quis pretium quis id nunc laoreet aliquam
      ultrices nulla arcu.
      <span>
        <div class="mt-4">
          Magna lorem aliquet nunc ultrices ante. Morbi suspendisse placerat eget pharetra nascetur
          elit at orci tristique. Placerat risus rutrum fringilla a volutpat ut fusce. Nec placerat
          amet id iaculis risus tellus commodo massa fames.
        </div>
      </span>
    </p>
  </div>
  <div
    class="mx-auto w-full md:w-[982.67px] flex md:flex-row flex-col justify-between mt-4 md:mt-14 space-x-0 md:space-x-12"
  >
    <div class="w-full md:w-[482px]">
      <ArticleImage :src="newsItem.articleImage3" :imageCredit="newsItem.imageCredit" alt="photo" />
      <p
        class="text-[#595959] font-medium mt-1 md:mt-2 text-[11px] text-left md:text-right object-cover font-zalando uppercase"
      >
        Photo credit:
        {{ newsItem.imageCredit }}
      </p>
    </div>
    <div
      class="w-full md:w-[452.67px] text-sm md:text-[20px] text-[#262626] font-extralight leading-[30px] font-zalando md:px-0 px-4 md:pt-0 pt-4"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur. Elementum enim nisl lacus arcu duis nec posuere
        scelerisque. Mattis a fermentum tincidunt auctor. Quis pretium quis id nunc laoreet aliquam
        ultrices nulla arcu.
        <span>
          <div class="mt-4">
            Magna lorem aliquet nunc ultrices ante. Morbi suspendisse placerat eget pharetra
            nascetur elit at orci tristique. Placerat risus rutrum fringilla a volutpat ut fusce.
            Nec placerat amet id iaculis risus tellus commodo massa fames.
          </div>
        </span>
        <span>
          <div class="mt-4">
            Sit nisi ut viverra consequat proin. Velit faucibus consectetur arcu urna feugiat amet
            elit. Tincidunt neque volutpat eu senectus dignissim a mi vestibulum auctor. Nec aenean
            nunc eget at tincidunt enim quisque.
          </div>
        </span>
        <span>
          <div class="mt-4">
            Amet libero dignissim tellus varius tincidunt aliquet. Sit amet elementum mattis a
            pellentesque diam aliquam. Auctor sit pharetra adipiscing etiam urna rutrum. Vestibulum
            posuere quam commodo donec sapien semper rhoncus cras.
          </div>
        </span>
        <span>
          <div class="mt-4">
            At justo est orci eu neque enim. Pulvinar id interdum suscipit vitae elementum malesuada
            in. Ut vel vel at mi. Ac suspendisse ac elit aliquet pharetra massa aliquet vel
            penatibus. Turpis arcu in cursus nunc cursus sed faucibus faucibus.
          </div></span
        >
      </p>
    </div>
  </div>
  <div class="flex space-x-6 md:space-x-12 md:my-14 my-6 w-full justify-normal md:justify-center">
    <div>
      <ArticleImage :src="newsItem.articleImage2" :imageCredit="newsItem.imageCredit" alt="photo" />
      <p
        class="text-[#595959] font-medium mt-1 md:mt-2 text-[11px] text-left md:text-right object-cover font-zalando uppercase"
      >
        Photo credit:
        {{ newsItem.imageCredit }}
      </p>
    </div>
    <div>
      <ArticleImage :src="newsItem.articleImage1" :imageCredit="newsItem.imageCredit" alt="photo" />
      <p
        class="text-[#595959] font-medium mt-1 md:mt-2 text-[11px] text-left md:text-right object-cover font-zalando uppercase"
      >
        Photo credit:
        {{ newsItem.imageCredit }}
      </p>
    </div>
  </div>
  <div
    class="mx-auto w-full md:w-[700px] text-sm md:text-[20px] text-[#262626] font-extralight leading-[30px] font-zalando md:px-0 px-4 md:pt-0 pt-4"
  >
    <p>
      Lorem ipsum dolor sit amet consectetur. Elementum enim nisl lacus arcu duis nec posuere
      scelerisque. Mattis a fermentum tincidunt auctor. Quis pretium quis id nunc laoreet aliquam
      ultrices nulla arcu.
      <span>
        <div class="mt-4">
          Magna lorem aliquet nunc ultrices ante. Morbi suspendisse placerat eget pharetra nascetur
          elit at orci tristique. Placerat risus rutrum fringilla a volutpat ut fusce. Nec placerat
          amet id iaculis risus tellus commodo massa fames.
        </div>
      </span>
      <span>
        <div class="mt-4">
          Sit nisi ut viverra consequat proin. Velit faucibus consectetur arcu urna feugiat amet
          elit. Tincidunt neque volutpat eu senectus dignissim a mi vestibulum auctor. Nec aenean
          nunc eget at tincidunt enim quisque.
        </div>
      </span>
      <span>
        <div class="mt-4">
          Amet libero dignissim tellus varius tincidunt aliquet. Sit amet elementum mattis a
          pellentesque diam aliquam. Auctor sit pharetra adipiscing etiam urna rutrum. Vestibulum
          posuere quam commodo donec sapien semper rhoncus cras.
        </div>
      </span>
      <span>
        <div class="mt-4">
          At justo est orci eu neque enim. Pulvinar id interdum suscipit vitae elementum malesuada
          in. Ut vel vel at mi. Ac suspendisse ac elit aliquet pharetra massa aliquet vel penatibus.
          Turpis arcu in cursus nunc cursus sed faucibus faucibus.
        </div></span
      >
    </p>
  </div>
  <div class="mt-20 md:mt-40 mb-6 w-full px-0 md:px-[370px]">
    <AuthorCard
      :author="newsItem.author"
      :authorImage="newsItem.authorImage"
      :readMin="newsItem.readMin"
      :socialMedia="newsItem.socialMedia"
    />
  </div>
  <div class="bg-[#F0F0F0] border-t border-[#D9D9D9]">
    <div class="md:py-24 py-12 mx-4 md:mx-28">
      <h4 class="uppercase font-nippo font-medium text-lg md:text-[36px] text-[#1F1F1F] pb-6">
        Related Content
      </h4>
      <div class="flex md:flex-row flex-col gap-6 justify-normal md:justify-center">
        <RelatedContentCard
          v-for="(article, index) in others"
          :key="index"
          :type="article.type"
          image="relatedcontentimage.png"
          :category="article.category"
          :title="article.title"
          :description="article.description"
          :time="article.time"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NewsDetailsCard from '../components/News/NewsDetailsCard.vue'
import { computed, onMounted, ref } from 'vue'
import { useNewsDetailsStore } from '../stores/NewsDetailsStore'
import dayjs from 'dayjs'
import { formatToWAT, formatToTime } from '../utils/dateHelper'
import {
  faWhatsapp,
  faFacebook,
  faXTwitter,
  faLinktree,
  faInstagram,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import AuthorCard from '../components/News/AuthorCard.vue'
import ArticleImage from '../components/News/articleImage.vue'
import { articles } from '../data'
import RelatedContentCard from '../components/News/RelatedContentCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

const store = useNewsDetailsStore()
onMounted(() => {
  if (slug) {
    store.fetchNewsDetails(slug)
  }
})
const socialMediaLinks: { url: string; icon: any }[] = [
  { url: '/', icon: faXTwitter },
  { url: '/', icon: faFacebook },
  { url: '/', icon: faWhatsapp },
  // { url: '/', icon: faLinktree },

  // { url: '/', icon: faTiktok },
  // { url: '/', icon: faYoutube },
  // { url: '/', icon: faInstagram },
]
const detailNews = computed(() => store.newsDetails)
const formattedDate = computed(() => {
  if (!detailNews.value?.published_at) return ''
  return dayjs(detailNews.value.published_at).format('dddd D MMMM YYYY')
})
const categoryName = computed(() => {
  return detailNews.value?.categories?.[0]?.name ?? ''
})

console.log(detailNews.value)
const others = articles.filter((article) => article.category === 'interviews')
const newsItem = ref({
  title: 'Strong record of player development and community engagement',
  date: 'Saturday 13 December 2025 ',
  imageUrl: '/assets/images/playingballnews.png',
  imageCredit: 'jaytee ojo foundation academy',
  author: ' James Akinlabi',
  authorImage: '/assets/images/Avatr.png',
  socialMedia: socialMediaLinks,
  readMin: '5 ',
  headline:
    'Lorem ipsum dolor sit amet consectetur. Sed ornare molestie leo fringilla in quis amet. Cras molestie non facilisi elementum pretium. Amet aliquam turpis sed tempus urna. Quis id adipiscing aliquam fusce tincidunt sen.',
  content: `Lorem ipsum dolor sit amet consectetur. Elementum enim nisl lacus arcu duis nec posuere scelerisque. Mattis a fermentum tincidunt auctor. Quis pretium quis id nunc laoreet aliquam ultrices nulla arcu.
Magna lorem aliquet nunc ultrices ante. Morbi suspendisse placerat eget pharetra nascetur elit at orci tristique. Placerat risus rutrum fringilla a volutpat ut fusce. Nec placerat amet id iaculis risus tellus commodo massa fames.
Sit nisi ut viverra consequat proin. Velit faucibus consectetur arcu urna feugiat amet elit. Tincidunt neque volutpat eu senectus dignissim a mi vestibulum auctor. Nec aenean nunc eget at tincidunt enim quisque.
Amet libero dignissim tellus varius tincidunt aliquet. Sit amet elementum mattis a pellentesque diam aliquam. Auctor sit pharetra adipiscing etiam urna rutrum. Vestibulum posuere quam commodo donec sapien semper rhoncus cras.
At justo est orci eu neque enim. Pulvinar id interdum suscipit vitae elementum malesuada in. Ut vel vel at mi. Ac suspendisse ac elit aliquet pharetra massa aliquet vel penatibus. Turpis arcu in cursus nunc cursus sed faucibus faucibus. `,
  type: 'Interview',
  time: '14:14',
  articleImage4: '/assets/images/articleImage4.png',
  articleImage3: '/assets/images/articleImage3.png',
  articleImage2: '/assets/images/articleImage2.png',
  articleImage1: '/assets/images/articleImage1.png',
})
</script>
