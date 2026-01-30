import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { ref } from "vue";
interface Team {
  "id": 0,
  "name": "string",
  "logo": "string"
}
interface Result {
  "id": number,
  "home_score": number,
  "away_score": number,
  "fixture": number
}
interface FixtureResults {
  "id": 0,
  "home_team": Team,
  "away_team": Team,
  "match_date": "2026-01-20T16:11:59.560Z",
  "venue": "string",
  "competition": "string",
  "is_played": true,
  "result": Result
}
export const useFixtureResults = defineStore('fixtureResults', () => {
  // state
  const results = ref<FixtureResults[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // actions
  const fetchFixtureResults = async (filters: {
    competition?: string
    team?: string
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
