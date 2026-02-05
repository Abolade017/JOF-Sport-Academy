import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

interface Category {
  name: string
  slug: string
}
interface Videos {
  id: number
  title: string
  slug: string
  excerpt: string
  published_at: string
  thumbnail_url: string
  video_url: string | null
  categories: Category[]
}

export const useVideosStore = defineStore('videos', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as null | string,
      videos: [] as Videos[]
    }
  },
  actions: {
    async fetchVideos() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get('/sport/api/news/videos/')
        if (response.status === 200) {
          this.videos = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch videos'
        }
      }
    }
  }
})
