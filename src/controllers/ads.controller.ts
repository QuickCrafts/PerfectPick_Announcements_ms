import { Request, Response } from 'express'
import adsFacade from '../facades/ads.facade'

class AdsController {
  public async getAds (_req: Request, res: Response): Promise<void> {
    return await adsFacade.getAds(res)
  }

  public async getAdsActive (_req: Request, res: Response): Promise<void> {
    return await adsFacade.getAdsActive(res)
  }

  public async getAdsByCompany (req: Request, res: Response): Promise<void> {
    return await adsFacade.getAdsByCompany(req, res)
  }

  public async getById (req: Request, res: Response): Promise<void> {
    return await adsFacade.getById(req, res)
  }

  public async createAd (req: Request, res: Response): Promise<void> {
    return await adsFacade.createAd(req, res)
  }

  public async updateAd (req: Request, res: Response): Promise<void> {
    return await adsFacade.updateAd(req, res)
  }

  public async deleteAd (req: Request, res: Response): Promise<void> {
    return await adsFacade.deleteAd(req, res)
  }
} export default new AdsController()
