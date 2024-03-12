/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import userAdsController from '../controllers/users_ads.controllers'

const userAds = Router()

userAds.get('/', userAdsController.getUsersAds)
userAds.post('/', userAdsController.createUsersAds)

export default userAds
