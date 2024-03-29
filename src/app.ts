import express, { Application } from 'express'
import adsRoutes from './routes/ads.routes'
import companiesRouter from './routes/companies.routes'
import paymentsRouter from './routes/payments.routes'
import dataRouter from './routes/mercadoPagoData.routes'
import userAds from './routes/users_ads.routes'
import morgan from 'morgan'

export class App {
  private readonly app: Application
  constructor () {
    this.app = express()
    this.initMiddlewares()
    this.initRoutes()
  }

  private initMiddlewares (): void {
    this.app.use(morgan('dev')) // Show http requests in console
    this.app.use(express.json())
  }

  private initRoutes (): void {
    this.app.get('/', (_req, res) => {
      res.send('Hello ')
    })
    this.app.use('/ads', adsRoutes)
    this.app.use('/companies', companiesRouter)
    this.app.use('/payments', paymentsRouter)
    this.app.use('/data', dataRouter)
    this.app.use('/user', userAds)
  }

  public getApp (): Application {
    return this.app
  }
}
