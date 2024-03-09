import { Request, Response } from 'express'
import adsFacade from '../facades/ads.facade'

class AdsController {
  public getAds (_req: Request, res: Response): void {
    return adsFacade.getAds(res)
  }

  public getById (_req: Request, res: Response): void {
    return adsFacade.getById(res)
  }

  public createAd (_req: Request, res: Response): void {
    return adsFacade.createAd(res)
  }

  public updateAd (_req: Request, res: Response): void {
    return adsFacade.updateAd(res)
  }

  public deleteAd (_req: Request, res: Response): void {
    return adsFacade.deleteAd(res)
  }
} export default new AdsController()
