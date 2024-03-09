import { Router } from 'express'
import adsController from '../controllers/ads.controller'

const adsRouter = Router()

adsRouter.get('/', adsController.getAds)
adsRouter.get('/:id', adsController.getById)
adsRouter.post('/', adsController.createAd)
adsRouter.put('/:id', adsController.updateAd)
adsRouter.delete('/:id', adsController.deleteAd)

export default adsRouter
