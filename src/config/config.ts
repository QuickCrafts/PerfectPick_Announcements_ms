import dotenv from 'dotenv'
export class Config {
  private readonly MySQL_USER: string
  private readonly MySQL_PASSWORD: string
  private readonly HOST: string
  private readonly DBPORT: number
  private readonly PORT: number

  constructor () {
    dotenv.config()
    this.MySQL_USER = process.env.MySQL_USER ?? ''
    this.MySQL_PASSWORD = process.env.MySQL_PASSWORD ?? ''
    this.HOST = process.env.HOST ?? ''
    this.PORT = parseInt(process.env.PORT ?? '1000', 10)
    this.DBPORT = parseInt(process.env.DBPORT ?? '3000', 10)
  }

  public getHost (): string {
    return this.HOST
  }

  public getPORT (): number {
    return this.PORT
  }

  public getUser (): string {
    return this.MySQL_USER
  }

  public getPassword (): string {
    return this.MySQL_PASSWORD
  }

  public getDBPORT (): number {
    return this.DBPORT
  }
}
