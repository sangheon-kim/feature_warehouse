import express from "express"

class AppController {
  constructor() {}

  handleHome(_: express.Request, res: express.Response) {
    res.send("Home")
  }
}

export default new AppController()
