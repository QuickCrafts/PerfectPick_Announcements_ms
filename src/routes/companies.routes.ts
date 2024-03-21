/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import companiesController from '../controllers/companies.controller'
import { companySchemaCreated, companySchemaUpdated } from '../schemas/company.schema'
import { validateSchema } from '../middlewares/validator.middleware'

const companiesRouter = Router()

companiesRouter.get('/', companiesController.getCompanies)
companiesRouter.get('/:id', companiesController.getById)
companiesRouter.delete('/:id', companiesController.deleteCompany)

companiesRouter.post('/', validateSchema(companySchemaCreated), companiesController.createCompany)
companiesRouter.put('/:id', validateSchema(companySchemaUpdated), companiesController.updateCompany)

export default companiesRouter
