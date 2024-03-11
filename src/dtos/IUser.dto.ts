import { ICountry } from './ICountries.dto'

export interface IUser {
  id: number // User id
  firstname: string
  lastname: string // User last name
  avatar_url?: string // Url of avatar image
  birthdate?: string // String with the timestamp
  gender?: 'M' | 'F' | 'O' | 'P' // User gender coded
  country?: ICountry // Country information
  created_time: string // String with the timestamp
  email: string
  verified: boolean
  setup: boolean
}
