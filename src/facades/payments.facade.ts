import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'

class PaymentsFacade {
  public async getPayments (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM payments')
    console.log(rows)
    res.json(rows)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    const idPayment = req.params.id
    const [rows] = await pool.query('SELECT * FROM payments where id_payment = ?', [idPayment])
    console.log(rows)
    res.json(rows)
  }

  public async createPayment (req: Request, res: Response): Promise<void> {
    const { idAd, amountPayment, createdTime, statusPayment } = req.body
    console.log(req.body)
    console.log(idAd)
    const [rows] = await pool.query('INSERT INTO payments (id_ad, amount_payment,created_time,status_payment) VALUES (?, ?,?, ?)', [idAd, amountPayment, createdTime, statusPayment])
    const response = {
      id: (rows as OkPacket).insertId,
      idAd,
      amountPayment,
      createdTime,
      statusPayment
    }
    res.json(response)
  }

  public async updatePayment (req: Request, res: Response): Promise<void> {
    const idPayment = req.params.id
    const { idAd, amountPayment, createdTime, statusPayment } = req.body
    await pool.query('UPDATE payments SET id_ad = ?, amount_payment = ?,created_time = ?,status_payment = ? WHERE id_payment = ?', [idAd, amountPayment, createdTime, statusPayment, idPayment])
    const response = {
      idPayment,
      idAd,
      amountPayment,
      createdTime,
      statusPayment
    }
    res.json(response)
  }
} export default new PaymentsFacade()
