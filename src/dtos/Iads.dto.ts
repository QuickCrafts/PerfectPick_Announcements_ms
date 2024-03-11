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
export interface IAdsCreate {
  name: string
  ad: string
  start_date: string
  end_date: string
  description: string
  id_company: number
}
export interface IAdsUpdate {
  name: string
  ad: string
  start_date: string
  end_date: string
  description: string
  id_company: number
  published_ad: boolean
}
export interface IAdsGet {
  exact_date: boolean
  start_date: string
  end_date: string
  id_company: number
  published_ad: boolean
}
export interface IAdsGetById {
  id: number
}
export interface IAdsPublish {
  id: number
}
export interface IAdsDelete {
  id: number
}
