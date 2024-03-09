import { Router } from 'express'
import companiesController from '../controllers/companies.controller'

const companiesRouter = Router()

companiesRouter.get('/', companiesController.getCompanies)
companiesRouter.get('/:id', companiesController.getById)
companiesRouter.post('/', companiesController.createCompany)
companiesRouter.put('/:id', companiesController.updateCompany)
companiesRouter.delete('/:id', companiesController.deleteCompany)

export default companiesRouter
