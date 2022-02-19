import express from 'express'
import { Controller } from 'src/types/env'

class AppController implements Controller {
  public path = '/'
  public router = express.Router()
  constructor() {
    this.init()
  }

  init() {
    this.router.get(this.path, this.handleHome)
  }

  handleHome(_: express.Request, res: express.Response) {
    res.send('Home')
  }
}

export default AppController
