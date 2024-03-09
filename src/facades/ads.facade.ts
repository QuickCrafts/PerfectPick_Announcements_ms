import { Response } from 'express'

class AdsFacade {
  public getAds (res: Response): void {
    res.json('all ads')
  }

  public getById (res: Response): void {
    res.json('one ads')
  }

  public createAd (res: Response): void {
    res.json('create ads')
  }

  public updateAd (res: Response): void {
    res.json('update ads')
  }

  public deleteAd (res: Response): void {
    res.json('delete ads')
  }
} export default new AdsFacade()
