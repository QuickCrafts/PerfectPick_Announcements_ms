import { IAgeRange, IAgeDictionary } from '../dtos/IAnalysis.dto'

export class AdsService {
  public getEdad (hoy: Date, dateString: string): number {
    const fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }

  public createDictionary (length: number): Map< IAgeDictionary, IAgeRange> {
    const dictionary = new Map< IAgeDictionary, IAgeRange>()
    const max = 120
    for (let index = 0; index < max; index = index + length) {
      const lower = index
      const upper = index + length
      const key = {
        lower,
        upper
      }
      const value = {
        lower_age: 0,
        upper_age: 0,
        total: 0,
        like_info: 0
      }
      dictionary.set(key, value)
    }
    return dictionary
  }
}
