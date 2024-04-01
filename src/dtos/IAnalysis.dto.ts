export interface IAgeRange {
  lower_age: number
  upper_age: number
  total: number
  like_info: ICountLikes
}
export interface IAgeDictionary {
  lower: number
  upper: number
}

export interface ICountLikes {
  lk_total: number
  dlk_total: number
  blk_total: number
  avr_rating: number
}
