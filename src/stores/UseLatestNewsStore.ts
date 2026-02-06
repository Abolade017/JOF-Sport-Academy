import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import LatestNews from "@/components/common/LatestNews.vue";
interface Category {
  name: string,
  slug: string
}
interface News {

  "id": number,
  "title": string,
  "slug": string,
  "excerpt": string,
  "published_at": string
  "thumbnail_url": string,
  "video_url": string,
  "categories": Category[]
}


export const useLatestNews = defineStore('latestNews', {
  state: () => {
    return {

      loading: false as boolean,
      error: null as string | null,
      latestNews: [] as News[]
    }
  },

  actions: {
    async fetchLatestNews() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get<News[]>('/sport/api/news/')
        if (response.status === 200 || response.status === 201) {
          this.latestNews = response.data
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch latest news'
        } else {
          this.error = 'Unexpected error occurred'
        }
      } finally {
        this.loading = false
      }

    }
  }
})

