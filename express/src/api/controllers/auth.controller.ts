import express from 'express'
import { Controller } from 'src/types/env'

class AuthController implements Controller {
  public path = '/auth'
  public router = express.Router()
  constructor() {
    this.init()
  }

  init() {
    this.router.get(this.path, this.handleAuth)
  }

  handleAuth(_: express.Request, res: express.Response) {
    res.send('Auth Api')
  }
}

export default AuthController
