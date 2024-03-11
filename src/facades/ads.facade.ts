/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'
import { IAds } from '../dtos/Iads.dto'
import { IPayment } from '../dtos/Ipayment.dto'
import { ILikes } from '../dtos/ILikes.dto'
import { IUser } from '../dtos/IUser.dto'
import { ICountry } from '../dtos/ICountries.dto'

class AdsFacade {
  public async getAds (req: Request, res: Response): Promise<void> {
    console.log(new Date())
    const { exact_date, start_date, end_date, id_company, published_ad } = req.body
    if (exact_date !== undefined && typeof exact_date === 'boolean' && exact_date) {
      if (start_date !== undefined && typeof start_date === 'string') {
        const [rows] = await pool.query('SELECT * FROM ads where start_date_ad = ?', [start_date])
        console.log(rows)
        res.json(rows)
      }
      if (end_date !== undefined && typeof end_date === 'string') {
        const [rows] = await pool.query('SELECT * FROM ads where end_date_ad = ?', [end_date])
        console.log(rows)
        res.json(rows)
      }
    } else if (start_date !== undefined && typeof start_date === 'string') {
      const [rows] = await pool.query('SELECT * FROM ads where start_date_ad >= ?', [start_date])
      console.log(rows)
      res.json(rows)
    } else if (end_date !== undefined && typeof end_date === 'string') {
      const [rows] = await pool.query('SELECT * FROM ads where end_date_ad <= ?', [end_date])
      console.log(rows)
      res.json(rows)
    } else if (id_company !== undefined && typeof id_company === 'number') {
      const [rows] = await pool.query('SELECT * FROM ads where id_company = ?', [id_company])
      console.log(rows)
      res.json(rows)
    } else if (published_ad !== undefined && typeof published_ad === 'boolean') {
      const [rows] = await pool.query('SELECT * FROM ads where published_ad = ?', [published_ad])
      console.log(rows)
      res.json(rows)
    } else {
      const [rows] = await pool.query('SELECT * FROM ads')
      console.log(rows)
      res.json(rows)
    }
  }

  public async getById (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    const [rows] = await pool.query('SELECT * FROM ads where id_ad = ?', [idAd])
    console.log(rows)
    res.json(rows)
  }

  public async createAd (req: Request, res: Response): Promise<void> {
    const { name, ad, start_date, end_date, description, id_company } = req.body
    const create_date = new Date()
    const published_ad = 0
    console.log(req.body)
    const [rows] = await pool.query('INSERT INTO ads (name_ad, ad_url,start_date_ad,end_date_ad,create_date_ad,description_ad,published_ad,id_company) VALUES (?, ?,?, ?,?, ?,?, ?)', [name, ad, start_date, end_date, create_date, description, published_ad, id_company])
    const response = {
      id: (rows as OkPacket).insertId
    }
    res.json(response)
  }

  public async updateAd (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    const { name, ad, start_date, end_date, description, id_company } = req.body
    await pool.query('UPDATE ads SET name_ad = ?, ad_url = ?,start_date_ad = ?,end_date_ad = ?,description_ad = ?,id_company = ? WHERE id_ad = ?', [name, ad, start_date, end_date, description, id_company, idAd])
    res.status(200).json({
      message: idAd
    })
  }

  public async deleteAd (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    await pool.query('DELETE FROM ads WHERE id_ad = ?', [idAd])
    const response = {
      id: idAd,
      message: 'Ad deleted'
    }
    res.json(response)
  }

  public async publishAd (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    const [rowsPayment] = await pool.query('SELECT * FROM payments WHERE id_ad = ?', [idAd])
    const [rowsAds] = await pool.query('SELECT * FROM ads WHERE id_ad = ?', [idAd])
    const payments = rowsPayment as IPayment[]
    const ads = rowsAds as IAds[]

    if (payments.length === 0) {
      res.status(400).json({
        message: 'You need to pay for the ad'
      })
      return
    }
    for (const payment of payments) {
      if (payment.status_payment === 'PAID') {
        const date = new Date()
        if (date >= new Date(ads[0].start_date) && date <= new Date(ads[0].end_date)) {
          await pool.query('UPDATE ads SET published_ad = 1 WHERE id_ad = ?', [idAd])
          res.status(200).json({
            message: idAd
          })
        }
      }
    }
  }

  public async getByUserActiveAds (req: Request, res: Response): Promise<void> {
    const idUser = req.params.id
    const [rows] = await pool.query('SELECT * FROM ads WHERE id_ad IN (SELECT id_ad FROM users_ads WHERE id_user = ?)', [idUser])
    console.log(rows)
    res.json(rows)
  }

  public async getAdsAnalysis (req: Request, res: Response): Promise<void> {
    const { arr1, arr2, arr3 } = req.body
    const likes = arr1 as ILikes[]
    const users = arr2 as IUser[]
    const countries = arr3 as ICountry[]

    // Count likes
    let lk_total = 0
    let dlk_total = 0
    let blk_total = 0
    let avr_rating = 0
    const users_like = []
    for (const like of likes) {
      if (like.like_type === 'LK') {
        users_like.push(like.user_id)
        lk_total = lk_total + 1
        if (like.rating !== undefined) avr_rating = avr_rating + like.rating
      } else if (like.like_type === 'DLK') {
        dlk_total = dlk_total + 1
      } else if (like.like_type === 'BLK') {
        blk_total = blk_total + 1
      }
    }
    avr_rating = avr_rating / lk_total
    let f = 0
    let m = 0
    let o = 0
    let p = 0
    //Buscar en la lista d eusers likes la informacion join pero sin join
    for (const user of users_like){

    }
  }
} export default new AdsFacade()
