/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import adsController from '../controllers/ads.controller'
import { adSchemaCreated, adSchemaUpdated, adSchemaGet } from '../schemas/ads.schema'
import { Analysis_Schema } from '../schemas/analysis.schema'
import { validateSchema } from '../middlewares/validator.middleware'

const adsRouter = Router()

adsRouter.get('/', validateSchema(adSchemaGet), adsController.getAds)
adsRouter.post('/publish/:id', adsController.publishAd)
adsRouter.get('/active/:id', adsController.getByUserActiveAds)
adsRouter.get('/analysis/', validateSchema(Analysis_Schema), adsController.getAdsAnalysis)
adsRouter.get('/:id', adsController.getById)
adsRouter.post('/', validateSchema(adSchemaCreated), adsController.createAd)
adsRouter.put('/:id', validateSchema(adSchemaUpdated), adsController.updateAd)
adsRouter.delete('/:id', adsController.deleteAd)

export default adsRouter
