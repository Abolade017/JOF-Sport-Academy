export interface Team {
  id: 0,
  name: string,
  logo: string
}
export interface Fixtures {
  id: 0,
  home_team: Team,
  home_score: null | string,
  away_score: null | string,
  away_team: Team,
  match_date: string,
  league_logo_url: string
  league_logo: string
  venue: string,
  competition: string,
  is_played: boolean

}
