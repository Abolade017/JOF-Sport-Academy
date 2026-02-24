import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import axiosInstance from '@/api/axiosInstance';
import type { Fixtures } from '@/types/Fixtures';



export const useFixtureStore = defineStore('fixtures', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as string | null,
      fixtures: [] as Fixtures[]
    }
  },
  actions: {
    async fetchFixtures() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get('sport/api/fixtures/')
        if (response.status === 200 || response.status === 201) {
          this.loading = false
          this.fixtures = response.data
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch fixtures'
        }
      }
    }
  }
})
