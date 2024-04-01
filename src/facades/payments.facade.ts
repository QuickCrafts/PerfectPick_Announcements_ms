/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../dataBase'
import { OkPacket, RowDataPacket } from 'mysql2'
import { IPayment } from '../dtos/Ipayment.dto'
import { IData } from '../dtos/IData.dto'
import { IAds } from '../dtos/Iads.dto'

class PaymentsFacade {
  public async getPayments (req: Request, res: Response): Promise<void> {
    try {
      try {
        const { id_company, id_ad, status } = req.body
        if (id_company !== undefined && typeof id_company === 'number') {
          const paymentsByCompany = []
          console.log('id_company')
          const [rows] = await pool.query('SELECT * FROM payments')
          for (const row of rows as RowDataPacket[]) {
            const [rows2] = await pool.query('SELECT * FROM ads WHERE id_ad = ?', [row.id_ad])
            const ad = rows2 as IAds[]
            if (ad[0].id_company === id_company) {
              paymentsByCompany.push(row)
            }
          }
          res.json(paymentsByCompany)
          return
        } else if (id_ad !== undefined && typeof id_ad === 'number') {
          const [rows] = await pool.query('SELECT * FROM payments WHERE id_ad = ?', [id_ad])
          res.json(rows)
          return
        } else if (status !== undefined && typeof status === 'string') {
          const [rows] = await pool.query('SELECT * FROM payments WHERE status_payment = ?', [status])
          res.json(rows)
          return
        }

        const [rows] = await pool.query('SELECT * FROM payments')
        res.status(201).json(rows)
      } catch (e) {
        console.log(e)
        res.status(400).json({
          message: 'Guard failed'
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async getById (req: Request, res: Response): Promise<void> {
    const idPayment = req.params.id
    const [rows] = await pool.query('SELECT * FROM payments where id_payment = ?', [idPayment])
    console.log(rows)
    res.json(rows)
  }

  public async createPayment (req: Request, res: Response): Promise<void> {
    try {
      const { id_ad, amount } = req.body
      const createdTime = new Date()
      const statusPayment = 'CREATED'
      try {
        const [rows] = await pool.query('INSERT INTO payments (id_ad, amount_payment,created_time,status_payment) VALUES (?, ?,?, ?)', [id_ad, amount, createdTime, statusPayment])
        const response = {
          id: (rows as OkPacket).insertId
        }
        res.status(201).json(response)
      } catch (e) {
        res.status(400).json({
          message: 'Guard failed'
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Error'
      })
    }
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
    try {
      const idPayment = req.params.id
      if (idPayment === undefined || idPayment === null || isNaN(Number(idPayment))) {
        res.status(400).json({ message: 'Id not provided' })
        return
      }
      const [rows] = await pool.query('UPDATE payments SET status_payment = "CANCELED" WHERE id_payment = ?', [idPayment])
      if ((rows as OkPacket).affectedRows === 0) {
        res.status(404).json({
          message: 'Payment not found'
        })
        return
      }
      const response = {
        idPayment,
        message: 'Payment canceled'
      }
      res.status(201).json(response)
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async payBill (req: Request, res: Response): Promise<void> {
    try {
      const idPayment = req.params.id as unknown as number
      if (idPayment === undefined || idPayment === null || isNaN(Number(idPayment))) {
        res.status(400).json({ message: 'Id not provided' })
        return
      }
      const [rows] = await pool.query('SELECT * FROM payments WHERE id_payment = ?', [idPayment])
      if ((rows as IPayment[]).length === 0) {
        res.status(404).json({
          message: 'Bill not found'
        })
        return
      }
      if ((rows as IPayment[])[0].status_payment === 'CANCELED') {
        res.status(400).json({
          message: 'Bill is canceled and cannot be processed.'
        })
        return
      }

      if ((rows as IPayment[])[0].status_payment === 'PAID') {
        res.status(400).json({
          message: 'Payment already paid'
        })
        return
      }

      // Hacer pago
      try {
        const data = await this.createData(idPayment)
        await pool.query('UPDATE mercadopago_data SET id_payment = ?, status_payment = "PAID" where id_reference =  ?', [idPayment, data.id_reference])
        await pool.query('UPDATE payments SET status_payment = "PAID" WHERE id_payment = ?', [idPayment])
        const response = {
          message: 'Bill paid'
        }
        res.status(201).json(response)
      } catch (e) {
        await pool.query('UPDATE payments SET status_payment = "CANCELED" WHERE id_payment = ?', [idPayment])
        res.status(400).json({
          message: 'Payment wrong. Bill canceled.'
        })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async createData (id_payment: number): Promise<IData> {
    const status_payment = 'CREATED'
    const [rows] = await pool.query('INSERT INTO mercadopago_data (id_payment, status_payment) VALUES (?, ?)', [id_payment, status_payment])
    console.log(rows)
    const response = {
      id_reference: (rows as OkPacket).insertId,
      id_payment,
      status_payment
    }
    return response as IData
  }
} export default new PaymentsFacade()
