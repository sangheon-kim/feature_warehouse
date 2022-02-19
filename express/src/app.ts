import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { Controller } from 'src/types/env'
import DB from 'src/db'

class App {
  public app: express.Application
  db: DB = new DB()
  api_version: string
  constructor(controllers: Controller[], private port: number) {
    this.app = express()

    this.api_version = process.env.API_VERSION

    this.initMiddlewares()
    this.initControllers(controllers)
    this.db.init()
  }

  initMiddlewares() {
    this.app.use(express.json()) // body값 파싱 미들웨어
    this.app.use(cookieParser())
    this.app.use(morgan('dev'))
  }

  initControllers(contorllers: Controller[]) {
    contorllers.forEach((controller: Controller) => {
      this.app.use(`/v${this.api_version}`, controller.router)
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }
}

/** 404 처리 */
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   res.status(404).send(clientErrorHandler('페이지를 찾을 수 없습니다.'))
// })

export default App
