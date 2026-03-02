import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import { ref } from 'vue';

interface Team {
  id: number,
  position: string,
  first_name: string,
  last_name: string,
  age_category: string,
  gender: string,
  nationality: string,
  jersey_number: string,
  photo: string,
  school_attended: string,
  state_of_origin: string,
  created_at: string,
  team: number,
  team_name: string
}
type GroupedTeamsResponse = Record<string, Team[]>
export const useTeamStore = defineStore('teams', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as string | null,
      teams: [] as Team[],

    }
  },
  // getters: {
  //   playersByTeam: (state) =>
  //     state.teams.filter((player) => player.team_name === state.currentTeamName && player.position === 'Goal Keeper'),

  //   goalKeepers: (state) =>
  //     state.teams.filter(p => p.team_name === state.currentTeamName && p.position === 'Goal Keeper'),

  //   defenders: (state) =>
  //     state.teams.filter(p => p.team_name === state.currentTeamName && p.position === 'Defender'),

  //   midFielders: (state) =>
  //     state.teams.filter(p => p.team_name === state.currentTeamName && p.position === 'Midfielder'),

  //   forwards: (state) =>
  //     state.teams.filter(p => p.team_name === state.currentTeamName && p.position === 'Forward'),

  // },


  actions: {
    async fetchTeams(teamName: string) {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.get<GroupedTeamsResponse>('/sport/api/teams/players/',
          { params: { team_name: teamName } }

        )
        const data = response.data
        this.teams = Object.values(data).flat()

        console.log('Raw data stored in store:', data)
        // if (data[teamName]) {
        //   this.teams = data[teamName]
        // } else {
        //   this.teams = []
        // }
        console.log('API keys:', Object.keys(response.data))
        console.log('Requested team:', teamName)


      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message || 'Failed to fetch team'
        }
        else {
          this.error = 'Unexpected error occurred'
        }
      } finally {
        this.loading = false
      }
    }
  }
})
