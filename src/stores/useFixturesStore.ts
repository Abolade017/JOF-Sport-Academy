import { useFixtureResults } from './UseFixturesResultStore';
import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
interface Team {
  "id": 0,
  "name": "string",
  "logo": "string"
}

interface Fixtures {
  "id": 0,
  "home_team": Team,
  "away_team": Team,
  "match_date": string,
  "venue": string,
  "competition": string,
  "is_played": boolean

}

export const useFixtureStore = defineStore('fixtures', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as string | null,
      fixtures: [] as Fixtures[]
    }
  },
  actions: {
    async fetchFixtures(filters: {
      competition?: string
      team?: string
      year?: number
    }) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get('/sport/api/fixtures/', {
          params: filters
        })
        if (response.status === 200 || response.status === 201) {
          this.fixtures = response.data
          this.loading = false
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch match fixtures'
        }
      }

    }
  }
})
