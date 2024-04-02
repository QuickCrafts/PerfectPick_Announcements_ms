import { Response, Request } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'

class CompaniesFacade {
  public async getCompanies (res: Response): Promise<void> {
    try {
      const [rows] = await pool.query('SELECT * FROM companies')
      console.log(rows)
      res.status(200).json(rows)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async getById (req: Request, res: Response): Promise <void> {
    const idCompany = req.params.id
    const [rows] = await pool.query('SELECT * FROM companies where id_company = ?', [idCompany])
    console.log(rows)
    res.json(rows)
  }

  public async createCompany (req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body
      console.log(name, email)
      try {
        const [rows] = await pool.query('INSERT INTO companies (name_company, email_company) VALUES (?, ?)', [name, email])
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

  public async updateCompany (req: Request, res: Response): Promise<void> {
    try {
      const idCompany = req.params.id
      if (idCompany === undefined || idCompany === null || isNaN(Number(idCompany))) {
        res.status(400).json({ message: 'Id not provided' })
        return
      }
      const { name, email } = req.body
      try {
        let rows
        if (name !== undefined) {
          [rows] = await pool.query('UPDATE companies SET name_company = ? WHERE id_company = ?', [name, idCompany])
        }
        if (email !== undefined) {
          [rows] = await pool.query('UPDATE companies SET email_company = ? WHERE id_company = ?', [email, idCompany])
        }
        if ((rows as OkPacket).affectedRows === 0) {
          res.status(404).json({
            message: 'Company not found'
          })
          return
        }
        const response = {
          id: idCompany,
          message: 'Company updated'
        }
        res.status(201).json(response)
      } catch (e) {
        res.status(400).json({
          message: 'Guard failed'
        })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }

  public async deleteCompany (req: Request, res: Response): Promise<void> {
    try {
      const idCompany = req.params.id
      if (idCompany === undefined || idCompany === null || isNaN(Number(idCompany))) {
        res.status(400).json({ message: 'Id not provided' })
        return
      }
      try {
        const [rows] = await pool.query('DELETE FROM companies WHERE id_company = ?', [idCompany])
        if ((rows as OkPacket).affectedRows === 0) {
          res.status(404).json({
            message: 'Company not found'
          })
          return
        }
        const response = {
          id: idCompany,
          message: 'Company deleted'
        }
        res.status(201).json(response)
      } catch (e) {
        res.status(400).json({
          message: 'Guard failed'
        })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Error'
      })
    }
  }
} export default new CompaniesFacade()
