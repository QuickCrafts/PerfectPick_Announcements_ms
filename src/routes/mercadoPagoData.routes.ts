/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import dataController from '../controllers/mercadoPagoData.controller'

const dataRouter = Router()

dataRouter.get('/', dataController.getAllData)
dataRouter.get('/:id', dataController.getById)
dataRouter.post('/', dataController.createData)
dataRouter.put('/:id', dataController.updateData)

export default dataRouter
