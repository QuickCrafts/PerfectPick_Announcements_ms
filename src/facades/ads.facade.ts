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
import { IAgeRange, ICountLikes } from '../dtos/IAnalysis.dto'

class AdsFacade {
  public async getAds (req: Request, res: Response): Promise<void> {
    try {
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
      res.status(200).json(rows)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
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
        const [company] = await pool.query('SELECT * FROM companies WHERE id_company = ?', [id_company])
        if ((company as IAds[]).length === 0) {
          res.status(404).json({
            message: 'Company not found'
          })
          return
        }

        const [rows] = await pool.query('INSERT INTO ads (name_ad, ad_url,start_date_ad,end_date_ad,create_date_ad,description_ad,published_ad,id_company) VALUES (?, ?,?, ?,?, ?,?, ?)', [name, ad, start_date, end_date, create_date, description, published_ad, id_company])
        const response = {
          id: (rows as OkPacket).insertId
        }
        console.log(rows)
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
        const [company] = await pool.query('SELECT * FROM companies WHERE id_company = ?', [id_company])
        if ((company as IAds[]).length === 0) {
          res.status(404).json({
            message: 'Company not found'
          })
          return
        }
        let rows
        if (name !== undefined) {
          [rows] = await pool.query('UPDATE ads SET name_ad = ? WHERE id_ad = ?', [name, idAd])
        }
        if (ad !== undefined) {
          [rows] = await pool.query('UPDATE ads SET ad_url = ? WHERE id_ad = ?', [ad, idAd])
        }
        if (start_date !== undefined) {
          [rows] = await pool.query('UPDATE ads SET start_date_ad = ? WHERE id_ad = ?', [start_date, idAd])
        }
        if (end_date !== undefined) {
          [rows] = await pool.query('UPDATE ads SET end_date_ad = ? WHERE id_ad = ?', [end_date, idAd])
        }
        if (description !== undefined) {
          [rows] = await pool.query('UPDATE ads SET description_ad = ? WHERE id_ad = ?', [description, idAd])
        }
        if (id_company !== undefined) {
          [rows] = await pool.query('UPDATE ads SET id_company = ? WHERE id_ad = ?', [id_company, idAd])
        }

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
    try {
      const idAd = req.params.id
      const [rowsPayment] = await pool.query('SELECT * FROM payments WHERE id_ad = ?', [idAd])
      const [rowsAds] = await pool.query('SELECT * FROM ads WHERE id_ad = ?', [idAd])
      const payments = rowsPayment as IPayment[]
      const ads = rowsAds as IAdsDB[]

      if (payments.length === 0) {
        res.status(400).json({
          message: 'Ad not paid or not in active dates'
        })
        return
      }
      for (const payment of payments) {
        if (payment.status_payment === 'PAID') {
          const date = new Date()
          console.log(ads[0].start_date_ad)
          console.log(ads[0].end_date_ad)
          if (date >= new Date(ads[0].start_date_ad) && date <= new Date(ads[0].end_date_ad)) {
            await pool.query('UPDATE ads SET published_ad = 1 WHERE id_ad = ?', [idAd])
            res.status(200).json({
              message: idAd
            })
          } else {
            res.status(400).json({
              message: 'Ad not paid or not in active dates'
            })
          }
        }
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async getByUserActiveAds (req: Request, res: Response): Promise<void> {
    const idUser = req.params.id
    if (idUser === undefined || idUser === null || isNaN(Number(idUser))) {
      res.status(400).json({
        message: 'Id not provided'
      })
      return
    }
    const [rows] = await pool.query('SELECT * FROM ads WHERE id_ad IN (SELECT id_ad FROM users_ads WHERE id_user = ?) AND published_ad = 1', [idUser])
    if ((rows as IAds[]).length === 0) {
      res.status(404).json({
        message: 'Ad or user not found'
      })
      return
    }
    res.json(rows)
  }

  public async getAdsAnalysis (req: Request, res: Response): Promise<void> {
    try {
      const { likes, users } = req.body
      const likesI = likes as ILikes[]
      const usersI = users as IUser[]
      // const countries = arr3 as ICountry[]

      // Gender analysis
      const f: ICountLikes = {
        lk_total: 0,
        dlk_total: 0,
        blk_total: 0,
        avr_rating: 0
      }
      const m: ICountLikes = {
        lk_total: 0,
        dlk_total: 0,
        blk_total: 0,
        avr_rating: 0
      }
      const o: ICountLikes = {
        lk_total: 0,
        dlk_total: 0,
        blk_total: 0,
        avr_rating: 0
      }
      const p: ICountLikes = {
        lk_total: 0,
        dlk_total: 0,
        blk_total: 0,
        avr_rating: 0
      }

      // Country analysis
      const nationality: ICountry[] = []
      const age: any = []

      const adsService = new AdsService()

      const country_dictionary = new Map<string, ICountryCount>()

      // Age analysis
      const currentDate = new Date()
      const length = 10
      const ageDictionary = adsService.createDictionary(length)

      for (const user of usersI) {
        const likeRelation = likesI.filter(like => like.user_id === user.id)[0]
        if (user.country !== undefined) {
          let country: ICountryCount
          if (country_dictionary.has(user.country.name)) {
            country = country_dictionary.get(user.country.name) as ICountryCount
          } else {
            country = user.country as ICountryCount
            country.like_info = {
              lk_total: 0,
              dlk_total: 0,
              blk_total: 0,
              avr_rating: 0
            }
          }
          console.log(likeRelation.like_type)
          console.log(country)
          if (likeRelation.like_type === 'LK') {
            country.like_info.lk_total = country.like_info.lk_total + 1
            console.log('lk')
          } else if (likeRelation.like_type === 'DLK') {
            country.like_info.dlk_total = country.like_info.dlk_total + 1
          } else if (likeRelation.like_type === 'BLK') {
            country.like_info.blk_total = country.like_info.blk_total + 1
          }
          if (likeRelation.rating !== undefined) {
            country.like_info.avr_rating = country.like_info.avr_rating + likeRelation.rating
          }
          country_dictionary.set(user.country.name, country)
        }

        if (user.gender === 'F') {
          if (likeRelation.like_type === 'LK') f.lk_total = f.lk_total + 1
          else if (likeRelation.like_type === 'DLK') f.dlk_total = f.dlk_total + 1
          else if (likeRelation.like_type === 'BLK') f.blk_total = f.blk_total + 1
          if (likeRelation.rating !== undefined) f.avr_rating = f.avr_rating + likeRelation.rating
        } else if (user.gender === 'M') {
          if (likeRelation.like_type === 'LK') m.lk_total = m.lk_total + 1
          else if (likeRelation.like_type === 'DLK') m.dlk_total = m.dlk_total + 1
          else if (likeRelation.like_type === 'BLK') m.blk_total = m.blk_total + 1
          if (likeRelation.rating !== undefined) m.avr_rating = m.avr_rating + likeRelation.rating
        } else if (user.gender === 'O') {
          if (likeRelation.like_type === 'LK') o.lk_total = o.lk_total + 1
          else if (likeRelation.like_type === 'DLK') o.dlk_total = o.dlk_total + 1
          else if (likeRelation.like_type === 'BLK') o.blk_total = o.blk_total + 1
          if (likeRelation.rating !== undefined) o.avr_rating = o.avr_rating + likeRelation.rating
        } else if (user.gender === 'P') {
          if (likeRelation.like_type === 'LK') p.lk_total = p.lk_total + 1
          else if (likeRelation.like_type === 'DLK') p.dlk_total = p.dlk_total + 1
          else if (likeRelation.like_type === 'BLK') p.blk_total = p.blk_total + 1
          if (likeRelation.rating !== undefined) p.avr_rating = p.avr_rating + likeRelation.rating
        }

        // Age analysis
        if (user.birthdate !== undefined) {
          const age = adsService.getEdad(currentDate, user.birthdate)
          const key = Array.from(ageDictionary.keys()).find(key => key.lower <= age && key.upper >= age)
          if (key !== undefined) {
            const value = ageDictionary.get(key) as IAgeRange
            value.total = value.total + 1

            if (likeRelation.like_type === 'LK') value.like_info.lk_total = value.like_info.lk_total + 1
            else if (likeRelation.like_type === 'DLK') value.like_info.dlk_total = value.like_info.dlk_total + 1
            else if (likeRelation.like_type === 'BLK') value.like_info.blk_total = value.like_info.blk_total + 1
            if (likeRelation.rating !== undefined) value.like_info.avr_rating = value.like_info.avr_rating + likeRelation.rating

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
      // Avr_rating
      if (f.lk_total + f.dlk_total + f.blk_total !== 0) f.avr_rating = f.avr_rating / (f.lk_total + f.dlk_total + f.blk_total)
      if (m.lk_total + m.dlk_total + m.blk_total !== 0) m.avr_rating = m.avr_rating / (m.lk_total + m.dlk_total + m.blk_total)
      if (o.lk_total + o.dlk_total + o.blk_total !== 0) o.avr_rating = o.avr_rating / (o.lk_total + o.dlk_total + o.blk_total)
      if (p.lk_total + p.dlk_total + p.blk_total !== 0) p.avr_rating = p.avr_rating / (p.lk_total + p.dlk_total + p.blk_total)

      // Nationality analysis
      country_dictionary.forEach((value, _key) => {
        const total = value.like_info.lk_total + value.like_info.dlk_total + value.like_info.blk_total
        if (total !== 0) value.like_info.avr_rating = value.like_info.avr_rating / total
        nationality.push(value)
      })

      ageDictionary.forEach((value, key) => {
        const total = value.like_info.lk_total + value.like_info.dlk_total + value.like_info.blk_total
        if (total !== 0) value.like_info.avr_rating = value.like_info.avr_rating / total
        const ageRange = {
          range: (key.lower as unknown as string) + '-' + (key.upper as unknown as string),
          lower_age: value.lower_age,
          upper_age: value.upper_age,
          total: value.total,
          like_info: value.like_info
        }
        age.push(ageRange)
      })
      const gender = {
        f,
        m,
        o,
        p
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
