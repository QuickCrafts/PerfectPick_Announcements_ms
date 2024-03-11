/* eslint-disable @typescript-eslint/naming-convention */
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
    const { id_ad, amount } = req.body
    const createdTime = new Date()
    const statusPayment = 'CREATED'
    const [rows] = await pool.query('INSERT INTO payments (id_ad, amount_payment,created_time,status_payment) VALUES (?, ?,?, ?)', [id_ad, amount, createdTime, statusPayment])
    const response = {
      id: (rows as OkPacket).insertId
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

  // Esto no tiene sentido
  public async cancelPayment (req: Request, res: Response): Promise<void> {
    const idPayment = req.params.id
    await pool.query('UPDATE payments SET status_payment = "CANCELED" WHERE id_payment = ?', [idPayment])
    const response = {
      idPayment
    }
    res.json(response)
  }

  public async payBill (req: Request, res: Response): Promise<void> {
    const idPayment = req.params.id as unknown as number
    await this.createData(idPayment, res)
    // Hacer pago
    await pool.query('UPDATE payments SET status_payment = "PAID" WHERE id_payment = ?', [idPayment])
    const response = {
      idPayment
    }
    res.json(response)
  }

  public async createData (idPayment: number, res: Response): Promise<Response> {
    const statusPayment = 'CREATED'
    const [rows] = await pool.query('INSERT INTO mercadopago_data (id_payment, status_payment) VALUES (?, ?)', [idPayment, statusPayment])
    console.log(rows)
    const response = {
      id_reference: (rows as OkPacket).insertId,
      idPayment,
      statusPayment
    }
    return res.json(response)
  }
} export default new PaymentsFacade()
