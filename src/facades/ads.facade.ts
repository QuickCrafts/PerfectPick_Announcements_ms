/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'
import { IAds, IAdsDB } from '../dtos/Iads.dto'
import { IPayment } from '../dtos/Ipayment.dto'
import { ILikes } from '../dtos/ILikes.dto'
import { IUser } from '../dtos/IUser.dto'
import { ICountry, ICountryCount } from '../dtos/ICountries.dto'
import { AdsService } from '../services/ads.services'
import { IAgeRange } from '../dtos/IAnalysis.dto'

class AdsFacade {
  public async getAds (req: Request, res: Response): Promise<void> {
    const { exact_date, start_date, end_date, id_company, published_ad } = req.body
    if (exact_date !== undefined && typeof exact_date === 'boolean' && exact_date) {
      if (start_date !== undefined && typeof start_date === 'string') {
        const [rows] = await pool.query('SELECT * FROM ads where start_date_ad = ?', [start_date])
        res.json(rows)
        return
      } else if (end_date !== undefined && typeof end_date === 'string') {
        const [rows] = await pool.query('SELECT * FROM ads where end_date_ad = ?', [end_date])
        res.json(rows)
        return
      }
    } else if (start_date !== undefined && typeof start_date === 'string' && end_date !== undefined && typeof end_date === 'string') {
      const [rows] = await pool.query('SELECT * FROM ads where start_date_ad >= ? and end_date_ad <= ?', [start_date, end_date])
      res.json(rows)
      return
    } else if (start_date !== undefined && typeof start_date === 'string') {
      const [rows] = await pool.query('SELECT * FROM ads where start_date_ad >= ?', [start_date])
      res.json(rows)
      return
    } else if (end_date !== undefined && typeof end_date === 'string') {
      const [rows] = await pool.query('SELECT * FROM ads where end_date_ad <= ?', [end_date])
      res.json(rows)
      return
    } else if (id_company !== undefined && typeof id_company === 'number') {
      const [rows] = await pool.query('SELECT * FROM ads where id_company = ?', [id_company])
      res.json(rows)
      return
    } else if (published_ad !== undefined && typeof published_ad === 'boolean' && published_ad) {
      const [rows] = await pool.query('SELECT * FROM ads where published_ad = ?', [published_ad])
      res.json(rows)
      return
    }
    const [rows] = await pool.query('SELECT * FROM ads')
    res.json(rows)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    try {
      const idAd = req.params.id
      if (idAd === undefined || idAd === null || isNaN(Number(idAd))) {
        res.status(400).json({
          message: 'Id not provided'
        })
        return
      }
      const [rows] = await pool.query('SELECT * FROM ads where id_ad = ?', [idAd])
      if ((rows as IAds[]).length === 0) {
        res.status(404).json({
          message: 'Ad not found'
        })
        return
      }
      res.json(rows)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async createAd (req: Request, res: Response): Promise<void> {
    try {
      const { name, ad, start_date, end_date, description, id_company } = req.body
      const create_date = new Date()
      const published_ad = 0
      try {
        const [rows] = await pool.query('INSERT INTO ads (name_ad, ad_url,start_date_ad,end_date_ad,create_date_ad,description_ad,published_ad,id_company) VALUES (?, ?,?, ?,?, ?,?, ?)', [name, ad, start_date, end_date, create_date, description, published_ad, id_company])
        const response = {
          id: (rows as OkPacket).insertId
        }
        res.status(201).json(response)
      } catch (e) {
        res.status(400).json({ message: 'Guard failed' })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async updateAd (req: Request, res: Response): Promise<void> {
    try {
      const idAd = req.params.id
      if (idAd === undefined || idAd === null || isNaN(Number(idAd))) {
        res.status(400).json({
          message: 'Id not provided'
        })
        return
      }
      const { name, ad, start_date, end_date, description, id_company } = req.body
      try {
        const [rows] = await pool.query('UPDATE ads SET name_ad = ?, ad_url = ?,start_date_ad = ?,end_date_ad = ?,description_ad = ?,id_company = ? WHERE id_ad = ?', [name, ad, start_date, end_date, description, id_company, idAd])
        if ((rows as OkPacket).affectedRows === 0) {
          res.status(404).json({
            message: 'Ad not found'
          })
          return
        }
      } catch (e) {
        res.status(400).json({
          message: 'Guard failed'
        })
      }
      res.status(201).json({
        message: 'Ad updated'
      })
    } catch (e) {
      res.status(500).json({
        message: 'Guard failed'
      })
    }
  }

  public async deleteAd (req: Request, res: Response): Promise<void> {
    try {
      const idAd = req.params.id
      if (idAd === undefined || idAd === null || isNaN(Number(idAd))) {
        res.status(400).json({
          message: 'Id not provided'
        })
        return
      }
      const [rows] = await pool.query('DELETE FROM ads WHERE id_ad = ?', [idAd])
      if ((rows as OkPacket).affectedRows === 0) {
        res.status(404).json({
          message: 'Ad not found'
        })
        return
      }
      const response = {
        id: idAd,
        message: 'Ad deleted'
      }
      res.status(204).json(response)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async publishAd (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    const [rowsPayment] = await pool.query('SELECT * FROM payments WHERE id_ad = ?', [idAd])
    const [rowsAds] = await pool.query('SELECT * FROM ads WHERE id_ad = ?', [idAd])
    const payments = rowsPayment as IPayment[]
    const ads = rowsAds as IAdsDB[]

    if (payments.length === 0) {
      res.status(400).json({
        message: 'You need to pay for the ad'
      })
      return
    }
    for (const payment of payments) {
      if (payment.status_payment === 'PAID') {
        const date = new Date()
        if (date >= new Date(ads[0].start_date_ad) && date <= new Date(ads[0].end_date_ad)) {
          await pool.query('UPDATE ads SET published_ad = 1 WHERE id_ad = ?', [idAd])
          res.status(200).json({
            message: idAd
          })
        } else {
          res.status(400).json({
            message: 'The ad is not in the correct date'
          })
        }
      }
    }
  }

  public async getByUserActiveAds (req: Request, res: Response): Promise<void> {
    const idUser = req.params.id
    const [rows] = await pool.query('SELECT * FROM ads WHERE id_ad IN (SELECT id_ad FROM users_ads WHERE id_user = ?) AND published_ad = 1', [idUser])
    res.json(rows)
  }

  public async getAdsAnalysis (req: Request, res: Response): Promise<void> {
    try {
      const { likes, users } = req.body
      const likesI = likes as ILikes[]
      const usersI = users as IUser[]
      // const countries = arr3 as ICountry[]

      // Count likes
      let lk_total = 0
      let dlk_total = 0
      let blk_total = 0
      let avr_rating = 0
      const users_like: IUser[] = []
      for (const like of likesI) {
        if (like.like_type === 'LK') {
          users_like.push(usersI.find(user => user.id === like.user_id) as IUser)
          lk_total = lk_total + 1
          if (like.rating !== undefined) avr_rating = avr_rating + like.rating
        } else if (like.like_type === 'DLK') {
          dlk_total = dlk_total + 1
        } else if (like.like_type === 'BLK') {
          blk_total = blk_total + 1
        }
      }
      avr_rating = avr_rating / lk_total

      // Gender analysis
      let f = 0
      let m = 0
      let o = 0
      let p = 0

      // Country analysis
      const countries_count: ICountry[] = []
      const age_count: any = []

      const adsService = new AdsService()

      const country_dictionary = new Map<string, ICountryCount>()
      for (const user of users_like) {
        if (user.country !== undefined) {
          if (country_dictionary.has(user.country.name)) {
            const country = country_dictionary.get(user.country.name) as ICountryCount
            country.count = country.count + 1
            country_dictionary.set(user.country.name, country)
          } else {
            const country = user.country as ICountryCount
            country.count = 1
            country_dictionary.set(country.name, country)
          }
        }
        if (user.gender === 'F') {
          f = f + 1
        } else if (user.gender === 'M') {
          m = m + 1
        } else if (user.gender === 'O') {
          o = o + 1
        } else if (user.gender === 'P') {
          p = p + 1
        }
      }

      // Age analysis
      const currentDate = new Date()
      const length = 10
      const ageDictionary = adsService.createDictionary(length)
      for (const user of usersI) {
        if (user.birthdate !== undefined) {
          const age = adsService.getEdad(currentDate, user.birthdate)
          const key = Array.from(ageDictionary.keys()).find(key => key.lower <= age && key.upper >= age)
          if (key !== undefined) {
            const value = ageDictionary.get(key) as IAgeRange
            value.total = value.total + 1

            if (likesI.find(like => like.user_id === user.id) !== undefined) {
              value.like_info = value.like_info + 1
            }
            if (value.lower_age === 0 || value.lower_age > age) {
              value.lower_age = age
            }
            if (value.upper_age === 0 || value.upper_age < age) {
              value.upper_age = age
            }

            ageDictionary.set(key, value)
          }
        }
      }
      // Nationality analysis
      country_dictionary.forEach((value, _key) => {
        countries_count.push(value)
      })

      ageDictionary.forEach((value, key) => {
        age_count.push({ key, value })
      })
      const gender = {
        f,
        m,
        o,
        p
      }
      const nationality = {
        countries_count
      }
      const age = {
        age_count
      }
      const analysis = {
        id: likesI[0].id,
        gender,
        nationality,
        age
      }
      res.status(200).json(analysis)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }
} export default new AdsFacade()
