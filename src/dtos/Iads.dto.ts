export interface IAds {
  id: number
  name: string
  ad: string
  start_date: string
  end_date: string
  description: string
  id_company: number
  create_date: Date
  published_ad: boolean
}
export interface IAdsDB {
  id_ad: number
  name_ad: string
  ad_url: string
  start_date_ad: string
  end_date_ad: string
  create_date_ad: string
  description_ad: string
  published_ad: boolean
}
