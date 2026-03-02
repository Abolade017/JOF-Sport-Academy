export interface GuardianInfo {
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
export interface FootballProfile {
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
export interface RequiredUploads {
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
export interface PlayerProfile {
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
  requireduploads: RequiredUploads,
  stats: null

}
