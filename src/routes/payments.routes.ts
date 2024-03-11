/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import paymentsController from '../controllers/payments.controller'

const paymentsRouter = Router()

paymentsRouter.get('/', paymentsController.getPayments)
paymentsRouter.get('/:id', paymentsController.getById)
paymentsRouter.put('/:id', paymentsController.updatePayment)
paymentsRouter.post('/', paymentsController.createPayment)
paymentsRouter.put('/cancel/:id', paymentsController.cancelPayment)
paymentsRouter.put('/pay/:id', paymentsController.payBill)

export default paymentsRouter
