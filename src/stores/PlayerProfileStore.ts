import { defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';



interface GuardianInfo {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  country: string,
  state: string,
  address: string,
  created_at: string,
  player: 0

}
interface FootballProfile {
  id: number,
  preferred_positions: string,
  strong_foot: string,
  previous_team: string,
  years_of_experience: string,
  medical_conditions: string,
  descriptions: string,
  emergency_contact_name: string,
  emergency_contact_phone_number: string,
  created_at: string,
  player: 0
}
interface RequiredUploads {
  id: 0,
  birth_certificate: string,
  consent_letter: string,
  other_document: string,
  consent_to_training: boolean,
  confirm_information: boolean,
  agree_terms: boolean,
  submitted_at: string,
  player: 0
}
interface PlayerProfile {
  id: number,
  first_name: string,
  last_name: string,
  age_category: string,
  gender: string,
  nationality: string,
  school_attended: string,
  state_of_origin: string,
  team: 0,
  jersey_number: string | null,
  photo: string | null,
  team_name: string,
  created_at: string,
  position: string,
  guardian: GuardianInfo,
  footballprofile: FootballProfile,
  requireduploads: RequiredUploads

}
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
