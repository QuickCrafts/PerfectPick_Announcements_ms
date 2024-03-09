import { App } from './app'
import { Config } from './config/config'

const app = new App()
const config = new Config()
console.log(config.getPORT())
app.getApp().listen(config.getPORT(), () => {
  console.log(`Server is running on port ${config.getPORT()}`)
})
