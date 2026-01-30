import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import axiosInstance from '@/api/axiosInstance';

interface Team {
  id: number,
  name: string,
  logo: string
}
export const useTeamNameStore = defineStore('team', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as null | string,
      teams: [] as Team[]
    }
  },
  actions: {
    async fetchTeam() {
      this.loading = true,
        this.error = null
      try {
        const response = await axiosInstance.get('/sport/api/teams/')
        if (response.status === 200 || response.status === 201) {
          this.teams = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Error fetching team'
        }
      }
    }
  }
})
