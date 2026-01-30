// src/stores/useFixturesStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { AxiosError } from 'axios'


interface Team {
  id: number
  name: string
  logo: string
}

export interface Fixture {
  id: number
  home_team: Team
  away_team: Team
  match_date: string
  venue: string
  competition: string
  is_played: boolean
}


export const useFixturesStore = defineStore('fixtures', () => {
  // state
  const fixtures = ref<Fixture[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // actions
  const fetchFixtures = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axiosInstance.get('/sport/api/fixtures/upcoming/')

      if (response.status === 200) {
        fixtures.value = response.data
        loading.value = false
        console.log(fixtures.value[0]?.id)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message || 'Failed to fetch fixtures'
        loading.value = false
      }
    }
  }
  // expose state & actions
  return {
    fixtures,
    loading,
    error,
    fetchFixtures,
  }
})
