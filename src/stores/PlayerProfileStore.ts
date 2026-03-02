import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import type { PlayerProfile } from '@/types/PlayerProfile';



export const usePlayerProfileStore = defineStore('player profile', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as null | string,
      playerProfile: null as PlayerProfile | null
    }
  },
  actions: {
    async fetchPlayerProfile(id: number) {
      this.loading = true
      this.error = null
      try {

        const response = await axiosInstance.get(`/sport/api/teams/players/${id}/`)

        if (response.status === 200) {
          this.playerProfile = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch player profile'
        }
      }
    }
  }
})
