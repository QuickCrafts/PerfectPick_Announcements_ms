/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import adsController from '../controllers/ads.controller'

const adsRouter = Router()

adsRouter.get('/', adsController.getAds)
adsRouter.post('/publish/:id', adsController.publishAd)
adsRouter.get('/active/:id', adsController.getByUserActiveAds)
adsRouter.get('/analysis/', adsController.getAdsAnalysis)
adsRouter.get('/:id', adsController.getById)
adsRouter.post('/', adsController.createAd)
adsRouter.put('/:id', adsController.updateAd)
adsRouter.delete('/:id', adsController.deleteAd)

export default adsRouter
