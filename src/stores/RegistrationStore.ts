import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosInstance'
import { AxiosError } from 'axios'
export type GenderEnum = "Male" | "Female" | "Other"

export type ProfilePreferredPositionsEnum =
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Forward"

export type ProfileStrongFootEnum = "Right" | "Left" | "Both"

export type ProfileMedicalConditionsEnum = "Yes" | "No"

interface PlayerInfo {
  "first_name": string,
  "last_name": string,
  "age_category": string,
  "gender": GenderEnum | '',
  "nationality": string,
  "school_attended": string,
  "state_of_origin": string,
  "team": number
}

interface GuardianInfo {
  "guardian_first_name": string,
  "guardian_last_name": string,
  "guardian_email": string,
  "guardian_phone_number": string,
  "guardian_country": string,
  "guardian_state": string,
  "guardian_address": string,

}
interface PlayerProfile {
  "profile_preferred_positions": ProfilePreferredPositionsEnum | '',
  "profile_strong_foot": ProfileStrongFootEnum | '',
  "profile_years_of_experience": string,
  "profile_previous_team": string,
  "profile_medical_conditions": ProfileMedicalConditionsEnum | '',
  "profile_descriptions": string,
  "profile_emergency_contact_name": string,
  "profile_emergency_contact_phone_number": string,
}
interface RequiredUploads {
  "uploads_consent_letter": File | null,
  "uploads_birth_certificate": File | null,
  "uploads_other_document": File | null,
  "consent_to_training": boolean,
  "confirm_information": boolean,
  "agree_terms": boolean,
}
export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    loading: false,
    error: null as string | null,

    playerInfo: {
      first_name: '',
      last_name: '',
      age_category: '',
      gender: '',
      nationality: '',
      school_attended: '',
      state_of_origin: '',
      team: 0

    } as PlayerInfo,

    guardianInfo: {
      guardian_first_name: "",
      guardian_last_name: "",
      guardian_email: "",
      guardian_phone_number: "",
      guardian_country: "",
      guardian_state: "",
      guardian_address: "",


    } as GuardianInfo,
    footballProfile: {
      profile_preferred_positions: '',
      profile_strong_foot: '',
      profile_previous_team: '',
      profile_medical_conditions: '',
      profile_descriptions: '',
      profile_emergency_contact_name: '',
      profile_emergency_contact_phone_number: '',
      profile_years_of_experience: ''
    } as PlayerProfile,
    requiredUploads: {
      uploads_consent_letter: null,
      uploads_birth_certificate: null,
      uploads_other_document: null,
      consent_to_training: false,
      confirm_information: false,
      agree_terms: false,

    } as RequiredUploads,
  }),

  actions: {
    resetForm() {
      this.playerInfo = {
        first_name: '',
        last_name: '',
        age_category: '',
        gender: '',
        nationality: '',
        school_attended: '',
        state_of_origin: '',
        team: 0

      },
        this.guardianInfo = {
          guardian_first_name: "",
          guardian_last_name: "",
          guardian_email: "",
          guardian_phone_number: "",
          guardian_country: "",
          guardian_state: "",
          guardian_address: "",


        },
        this.footballProfile = {
          profile_preferred_positions: '',
          profile_strong_foot: '',
          profile_previous_team: '',
          profile_medical_conditions: '',
          profile_descriptions: '',
          profile_emergency_contact_name: '',
          profile_emergency_contact_phone_number: '',
          profile_years_of_experience: ''
        },
        this.requiredUploads = {
          uploads_consent_letter: null,
          uploads_birth_certificate: null,
          uploads_other_document: null,
          consent_to_training: false,
          confirm_information: false,
          agree_terms: false,

        }
      this.error = null
    },

    async submitFullRegistrationForm() {
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()
        // player info
        formData.append('first_name', this.playerInfo.first_name)
        formData.append('last_name', this.playerInfo.last_name)
        formData.append('age_category', this.playerInfo.age_category)
        formData.append('gender', this.playerInfo.gender)
        formData.append('nationality', this.playerInfo.nationality)
        formData.append('school_attended', this.playerInfo.school_attended)
        formData.append('state_of_origin', this.playerInfo.state_of_origin)
        // Guardian info
        formData.append('guardian_first_name', this.guardianInfo.guardian_first_name)
        formData.append('guardian_last_name', this.guardianInfo.guardian_last_name)
        formData.append('guardian_email', this.guardianInfo.guardian_email)
        formData.append(
          'guardian_phone_number',
          this.guardianInfo.guardian_phone_number
        )
        formData.append('guardian_country', this.guardianInfo.guardian_country)
        formData.append('guardian_state', this.guardianInfo.guardian_state)
        formData.append('guardian_address', this.guardianInfo.guardian_address)


        //  Football profile

        formData.append(
          'profile_preferred_positions',
          this.footballProfile.profile_preferred_positions
        )
        formData.append(
          'profile_strong_foot',
          this.footballProfile.profile_strong_foot
        )
        formData.append(
          'profile_previous_team',
          this.footballProfile.profile_previous_team
        )
        formData.append(
          'profile_medical_conditions',
          this.footballProfile.profile_medical_conditions
        )
        formData.append(
          'profile_descriptions',
          this.footballProfile.profile_descriptions
        )
        formData.append(
          'profile_emergency_contact_name',
          this.footballProfile.profile_emergency_contact_name
        )
        formData.append(
          'profile_emergency_contact_phone_number',
          this.footballProfile.profile_emergency_contact_phone_number
        )
        formData.append(
          'profile_emergency_contact_name',
          this.footballProfile.profile_emergency_contact_name
        )

        // Required uploads

        if (this.requiredUploads.uploads_birth_certificate instanceof File) {
          formData.append(
            'uploads_birth_certificate',
            this.requiredUploads.uploads_birth_certificate
          )
        }

        if (this.requiredUploads.uploads_consent_letter instanceof File) {
          formData.append(
            'uploads_consent_letter',
            this.requiredUploads.uploads_consent_letter
          )
        }
        if (this.requiredUploads.uploads_other_document instanceof File) {
          formData.append(
            'uploads_other_document',
            this.requiredUploads.uploads_other_document
          )
        }

        formData.append(
          'uploads_consent_to_training',
          this.requiredUploads.consent_to_training ? 'true' : 'false'
        )
        formData.append(
          'uploads_confirm_information',
          this.requiredUploads.confirm_information ? 'true' : 'false'
        )
        formData.append(
          'uploads_agree_terms',
          this.requiredUploads.agree_terms ? 'true' : 'false'
        )

        //  Submit
        await axiosInstance.post(
          '/sport/api/register/register/',
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        )
        this.resetForm()

      }
      catch (err) {
        this.error = err instanceof AxiosError ? err.message : 'Submission failed'
      }
      finally {
        this.loading = false
      }
    },
  },
})
