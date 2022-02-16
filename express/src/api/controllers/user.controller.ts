import express from "express"

class UserController {
  constructor() {}

  handleUser(req: express.Request, res: express.Response) {
    res.send("User Api")
  }
}

export default new UserController()
