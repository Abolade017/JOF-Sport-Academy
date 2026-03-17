import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { AxiosError } from 'axios'
interface Team {
  id: number,
  name: string,
  logo: string
}
interface Table {
  id: string,
  team: Team,
  season_year: number,
  competition: string,
  played: number,
  won: number,
  draw: number,
  lost: number,
  goals_for: number,
  goals_against: number,
  points: number

}
export const useLeaguetableStore = defineStore('leagueTable', () => {
  // state
  const table = ref<Table[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>('')
  // actions
  const fetchLeagueTable = async (filters: {
    competition?: string
    // team?: string
    year?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const response = await axiosInstance.get('/sport/api/league-table/', { params: filters })
      if (response.status === 200) {
        table.value = response.data
        loading.value = false
        console.log(table.value)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message || 'Failed to fetch league table'
      }
      else {
        error.value = 'Unexpected error occurred'
      }
    }
  }
  return {
    table,
    loading,
    error,
    fetchLeagueTable,
  }
})

