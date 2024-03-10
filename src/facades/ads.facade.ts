import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'

class AdsFacade {
  public async getAds (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM ads')
    console.log(rows)
    res.json(rows)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    const idCompany = req.params.id
    const [rows] = await pool.query('SELECT * FROM ads where id_ad = ?', [idCompany])
    console.log(rows)
    res.json(rows)
  }

  public async getAdsActive (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM ads where published_ad = 1')
    console.log(rows)
    res.json(rows)
  }

  public async getAdsByCompany (req: Request, res: Response): Promise<void> {
    const { idCompany } = req.body
    const [rows] = await pool.query('SELECT * FROM ads where id_company = ?', [idCompany])
    console.log(rows)
    res.json(rows)
  }

  public async createAd (req: Request, res: Response): Promise<void> {
    const { nameAd, adUrl, startDateAd, endDateAd, createDateAd, descriptionAd, publishedAd, idCompany } = req.body
    console.log(req.body)
    const [rows] = await pool.query('INSERT INTO ads (name_ad, ad_url,start_date_ad,end_date_ad,create_date_ad,description_ad,published_ad,id_company) VALUES (?, ?,?, ?,?, ?,?, ?)', [nameAd, adUrl, startDateAd, endDateAd, createDateAd, descriptionAd, publishedAd, idCompany])
    const response = {
      id: (rows as OkPacket).insertId,
      nameAd,
      adUrl,
      startDateAd,
      endDateAd,
      createDateAd,
      descriptionAd,
      publishedAd,
      idCompany
    }
    res.json(response)
  }

  public async updateAd (req: Request, res: Response): Promise<void> {
    const idAd = req.params.id
    const { nameAd, adUrl, startDateAd, endDateAd, createDateAd, descriptionAd, publishedAd, idCompany } = req.body
    await pool.query('UPDATE ads SET name_ad = ?, ad_url = ?,start_date_ad = ?,end_date_ad = ?,create_date_ad = ?,description_ad = ?,published_ad = ?,id_company = ? WHERE id_ad = ?', [nameAd, adUrl, startDateAd, endDateAd, createDateAd, descriptionAd, publishedAd, idCompany, idAd])
    const response = {
      idAd,
      nameAd,
      adUrl,
      startDateAd,
      endDateAd,
      createDateAd,
      descriptionAd,
      publishedAd,
      idCompany
    }
    res.json(response)
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
} export default new AdsFacade()
