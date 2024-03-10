import express, { Application } from 'express'
import adsRoutes from './routes/ads.routes'
import companiesRouter from './routes/companies.routes'
import paymentsRouter from './routes/payments.routes'
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
    this.app.use('/ads', adsRoutes)
    this.app.use('/companies', companiesRouter)
    this.app.use('/payments', paymentsRouter)
  }

  public getApp (): Application {
    return this.app
  }
}
