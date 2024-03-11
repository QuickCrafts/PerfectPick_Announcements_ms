export interface ICountry {
  id: number
  name: string
  code_2: string
  code_3: string
}

export interface ICountryCount extends ICountry {
  count: number
}
