/* eslint-disable @typescript-eslint/return-await */
import { Request, Response } from 'express'
import adsFacade from '../facades/ads.facade'

class AdsController {
  public async getAds (req: Request, res: Response): Promise<void> {
    return await adsFacade.getAds(req, res)
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

  public async publishAd (req: Request, res: Response): Promise<void> {
    return await adsFacade.publishAd(req, res)
  }

  public async getByUserActiveAds (req: Request, res: Response): Promise<void> {
    return await adsFacade.getByUserActiveAds(req, res)
  }

  public async getAdsAnalysis (_req: Request, res: Response): Promise<void> {
    return await adsFacade.getAdsAnalysis(res)
  }
} export default new AdsController()
