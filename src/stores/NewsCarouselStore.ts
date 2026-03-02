import { defineStore } from "pinia";
import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";
interface Carousels {
  id: number,
  title: string,
  image_url: string | null
}

export const useCarouselNews = defineStore('carousels', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as string | null,
      carousels: [] as Carousels[]
    }
  },
  actions: {
    async fetchCarousels() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get('/sport/api/news/carousel/')
        if (response.status === 200) {
          this.carousels = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch carousels'

        }
      }
    }
  }
})
