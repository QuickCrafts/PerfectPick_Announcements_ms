import { Response, Request } from 'express'
import { pool } from '../dataBase'
import { OkPacket } from 'mysql2'

class CompaniesFacade {
  public async getCompanies (res: Response): Promise<void> {
    const [rows] = await pool.query('SELECT * FROM companies')
    console.log(rows)
    res.json(rows)
  }

  public async getById (req: Request, res: Response): Promise <void> {
    const idCompany = req.params.id
    const [rows] = await pool.query('SELECT * FROM companies where id_company = ?', [idCompany])
    console.log(rows)
    res.json(rows)
  }

  public async createCompany (req: Request, res: Response): Promise<void> {
    const { nameCompany, emailCompany } = req.body
    const [rows] = await pool.query('INSERT INTO companies (name_company, email_company) VALUES (?, ?)', [nameCompany, emailCompany])
    const response = {
      id: (rows as OkPacket).insertId,
      nameCompany,
      emailCompany
    }
    res.json(response)
  }

  public async updateCompany (req: Request, res: Response): Promise<void> {
    const idCompany = req.params.id
    const { nameCompany, emailCompany } = req.body
    await pool.query('UPDATE companies SET name_company = ?, email_company = ? WHERE id_company = ?', [nameCompany, emailCompany, idCompany])
    const response = {
      id: idCompany,
      nameCompany,
      emailCompany
    }
    res.json(response)
  }

  public async deleteCompany (req: Request, res: Response): Promise<void> {
    const idCompany = req.params.id
    await pool.query('DELETE FROM companies WHERE id_company = ?', [idCompany])
    const response = {
      id: idCompany,
      message: 'Company deleted'
    }
    res.json(response)
  }
} export default new CompaniesFacade()
