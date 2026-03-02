import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosInstance'
import { AxiosError } from 'axios'

interface Competition {
  competition: string
}
export const useCompetitonStore = defineStore('competition', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as null | string,
      competitions: [] as Competition[]

    }

  },
  actions: {
    async fetchcompetitions() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get('/sport/api/fixtures/competitions/')
        if (response.status === 200) {
          this.competitions = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'error fetching competitions'
        }
      }

    }
  }
})


