import { Request, Response } from 'express'
import paymentsFacade from '../facades/payments.facade'

class PaymentsController {
  public async getPayments (_req: Request, res: Response): Promise<void> {
    return await paymentsFacade.getPayments(res)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    return await paymentsFacade.getById(req, res)
  }

  public async createPayment (req: Request, res: Response): Promise<void> {
    return await paymentsFacade.createPayment(req, res)
  }

  public async updatePayment (req: Request, res: Response): Promise<void> {
    return await paymentsFacade.updatePayment(req, res)
  }

  public async cancelPayment (req: Request, res: Response): Promise<void> {
    return await paymentsFacade.cancelPayment(req, res)
  }

  public async payBill (req: Request, res: Response): Promise<void> {
    return await paymentsFacade.payBill(req, res)
  }
} export default new PaymentsController()
