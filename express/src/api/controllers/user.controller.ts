import express from 'express'
import { Controller } from 'src/types/env'

class UserController implements Controller {
  public path = '/user'
  public router = express.Router()
  constructor() {
    this.init()
  }

  init() {
    this.router.get(this.path, this.handleUser)
  }

  handleUser(req: express.Request, res: express.Response) {
    res.send('User Api')
  }
}

export default UserController
