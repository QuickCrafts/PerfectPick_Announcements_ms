import { Request, Response } from 'express'
import userAdsFacade from '../facades/users_ads.facade'

class UserAdsController {
  public async getUsersAds (_req: Request, res: Response): Promise<void> {
    return await userAdsFacade.getUsersAds(res)
  }

  public async createUsersAds (req: Request, res: Response): Promise<void> {
    return await userAdsFacade.createUsersAds(req, res)
  }
} export default new UserAdsController()
