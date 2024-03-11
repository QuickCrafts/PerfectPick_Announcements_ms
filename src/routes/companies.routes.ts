/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import companiesController from '../controllers/companies.controller'

const companiesRouter = Router()

companiesRouter.get('/', companiesController.getCompanies)
companiesRouter.get('/:id', companiesController.getById)
companiesRouter.delete('/:id', companiesController.deleteCompany)

companiesRouter.post('/', companiesController.createCompany)
companiesRouter.put('/:id', companiesController.updateCompany)

export default companiesRouter
