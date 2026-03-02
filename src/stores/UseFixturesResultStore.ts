import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { ref } from "vue";
interface Team {
  id: 0,
  name: string | null,
  logo: string | null
}
interface Result {
  id: number,
  home_score: number,
  away_score: number,
  fixture: number
}
interface FixtureResults {
  id: 0,
  home_team: Team,
  away_team: Team,
  match_date: string | null,
  venue: string | null,
  competition: string | null,
  is_played: boolean,
  result: Result
}
export const useFixtureResults = defineStore('fixtureResults', () => {
  // state
  const results = ref<FixtureResults[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // actions
  const fetchFixtureResults = async (filters: {
    competition?: string | null
    team?: string | null
    year?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const response = await axiosInstance.get('/sport/api/fixtures/results/', { params: filters })
      if (response.status === 200) {
        results.value = response.data
        loading.value = false
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message || 'Failed to fetch fixture results'
        loading.value = false
      }
    }
  }
  return {
    results,
    loading,
    error,
    fetchFixtureResults,
  }
})
