import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import NewsDetails from '@/views/NewsDetails.vue';

interface Category {

  "name": string,
  "slug": string
}
interface NewsDetails {
  "id": number,
  "title": string,
  "slug": string,
  "excerpt": string
  "published_at": string,
  "thumbnail_url": string,
  "video_url": string,
  "categories": Category[]
}

export const useNewsDetailsStore = defineStore('newsDetails', {
  state: () => {
    return {

      loading: false as boolean,
      error: null as string | null,
      newsDetails: NewsDetails

    }
  },
  actions: {
    async fetchNewsDetails(slug: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get(`/sport/api/news/${slug}/`)
        if (response.status === 200 || response.status === 201) {
          this.newsDetails = response.data

          this.loading = false
          this.error = null

          console.log(this.newsDetails)
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch news details'
        }
      } finally {
        this.loading = false
      }
    }
  }
})
