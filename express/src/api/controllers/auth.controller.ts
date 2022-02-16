import express from "express"

class AuthController {
  constructor() {}

  handleAuth(_: express.Request, res: express.Response) {
    res.send("Auth Api")
  }
}

export default new AuthController()
