import { createPool } from 'mysql2/promise'
import { Config } from './config/config'

const config = new Config()
export const pool = createPool({
  host: config.getURI(), // ip
  user: config.getUser(),
  password: config.getPassword(),
  port: config.getDBPORT(),
  database: 'db_ads'
})
