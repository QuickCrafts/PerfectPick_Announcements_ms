import { Request, Response } from 'express'
import companiesFacade from '../facades/companies.facade'

class CompanyController {
  public async getCompanies (_req: Request, res: Response): Promise<void> {
    return await companiesFacade.getCompanies(res)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    return await companiesFacade.getById(req, res)
  }

  public async createCompany (req: Request, res: Response): Promise <void> {
    return await companiesFacade.createCompany(req, res)
  }

  public async updateCompany (req: Request, res: Response): Promise<void> {
    return await companiesFacade.updateCompany(req, res)
  }

  public async deleteCompany (req: Request, res: Response): Promise<void> {
    return await companiesFacade.deleteCompany(req, res)
  }
} export default new CompanyController()
