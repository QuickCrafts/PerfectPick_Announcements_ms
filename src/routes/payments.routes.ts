/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import paymentsController from '../controllers/payments.controller'
import { billSchemaCreated, billSchemaGet } from '../schemas/bills.schema'
import { validateSchema } from '../middlewares/validator.middleware'

const paymentsRouter = Router()

paymentsRouter.get('/', validateSchema(billSchemaGet), paymentsController.getPayments)
paymentsRouter.get('/:id', paymentsController.getById)
paymentsRouter.put('/:id', paymentsController.updatePayment)
paymentsRouter.post('/', validateSchema(billSchemaCreated), paymentsController.createPayment)
paymentsRouter.put('/cancel/:id', paymentsController.cancelPayment)
paymentsRouter.put('/pay/:id', paymentsController.payBill)

export default paymentsRouter
