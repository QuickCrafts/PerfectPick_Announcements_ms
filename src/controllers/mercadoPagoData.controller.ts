import { Request, Response } from 'express'
import dataFacade from '../facades/mercadoPagoData.facade'

class MercadoPagoDataController {
  public async getAllData (_req: Request, res: Response): Promise<void> {
    return await dataFacade.getAllData(res)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    return await dataFacade.getById(req, res)
  }

  public async createData (req: Request, res: Response): Promise<void> {
    return await dataFacade.createData(req, res)
  }

  public async updateData (req: Request, res: Response): Promise<void> {
    return await dataFacade.updateData(req, res)
  }
} export default new MercadoPagoDataController()
