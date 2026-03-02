import { useFixtureResults } from './UseFixturesResultStore';
import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
interface Team {
  id: 0,
  name: string | null,
  logo: string | null
}

interface Fixtures {
  id: 0,
  home_team: Team,
  away_team: Team,
  match_date: string,
  venue: string | null,
  competition: string | null,
  is_played: boolean
  home_score: string | null,
  away_score: string | null,
  league_logo_url: string | null,
  // league_logo: string | null,

}

export const useUnplayedFixtureStore = defineStore('unplayedFixtures', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as string | null,
      fixtures: [] as Fixtures[]
    }
  },
  actions: {

    async fetchFixtures(filters: {
      competition?: string | null
      team?: string | null
      year?: number
    }) {
      this.loading = true
      this.error = null
      this.fixtures = []

      try {
        const response = await axiosInstance.get('/sport/api/fixtures/unplayed/', {
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
