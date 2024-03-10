import { Router } from 'express'
import paymentsController from '../controllers/payments.controller'

const paymentsRouter = Router()

paymentsRouter.get('/', paymentsController.getPayments)
paymentsRouter.get('/:id', paymentsController.getById)
paymentsRouter.post('/', paymentsController.createPayment)
paymentsRouter.put('/:id', paymentsController.updatePayment)

export default paymentsRouter
