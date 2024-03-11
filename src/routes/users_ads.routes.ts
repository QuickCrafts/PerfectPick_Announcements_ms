/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import userAdsController from '../controllers/users_ads.controllers'

const dataRouter = Router()

dataRouter.get('/', userAdsController.getUsersAds)
dataRouter.post('/', userAdsController.createUsersAds)

export default dataRouter
