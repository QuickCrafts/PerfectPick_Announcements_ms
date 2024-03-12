/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'

class UserAdsFacade {
  public async getUsersAds (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM users_ads')
    console.log(rows)
    res.json(rows)
  }

  public async createUsersAds (req: Request, res: Response): Promise<void> {
    try {
      const { id_ad, id_user } = req.body
      const [rows] = await pool.query('INSERT INTO users_ads (id_ad, id_user) VALUES (?, ?)', [id_ad, id_user])
      const response = {
        id: (rows as OkPacket).insertId
      }
      res.status(200).json(response)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }
} export default new UserAdsFacade()
