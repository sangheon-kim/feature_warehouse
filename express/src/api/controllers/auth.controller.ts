import express from 'express'

class AuthController {
  public path = '/auth'
  public router = express.Router()
  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(this.path, this.handleAuth)
  }

  handleAuth(_: express.Request, res: express.Response) {
    res.send('Auth Api')
  }
}

export default new AuthController()
