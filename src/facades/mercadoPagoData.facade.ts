import { Request, Response } from 'express'
import { pool } from '../dataBase'

class MercadoPagoDataFacade {
  public async getAllData (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM mercadopago_data')
    console.log(rows)
    res.json(rows)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    const idData = req.params.id
    const [rows] = await pool.query('SELECT * FROM mercadopago_data where id_reference = ?', [idData])
    console.log(rows)
    res.json(rows)
  }

  public async createData (req: Request, res: Response): Promise<void> {
    const { idReference, idPayment, statusPayment } = req.body
    const [rows] = await pool.query('INSERT INTO mercadopago_data (id_reference, id_payment, status_payment) VALUES (?, ?, ?)', [idReference, idPayment, statusPayment])
    console.log(rows)
    const response = {
      idReference,
      idPayment,
      statusPayment
    }
    res.json(response)
  }

  public async updateData (req: Request, res: Response): Promise<void> {
    const idData = req.params.id
    const { idPayment, statusPayment } = req.body
    await pool.query('UPDATE mercadopago_data SET id_payment = ?, status_payment = ? where id_reference =  ?', [idPayment, statusPayment, idData])
    const response = {
      idData,
      idPayment,
      statusPayment
    }
    res.json(response)
  }
} export default new MercadoPagoDataFacade()
