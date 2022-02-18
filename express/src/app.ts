import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import appRouter from './api/routes/app.router'
import userRouter from './api/routes/user.router'
// import authRouter from './api/routes/auth.roouter'
import { clientErrorHandler } from './api/common/middlewares/errorHandler'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
  }
}

const { app } = new App()

app.use(express.json()) // body값 파싱 미들웨어
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/', appRouter)
app.use('/user', userRouter)
// app.use('/auth', authRouter)

/** 404 처리 */
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send(clientErrorHandler('페이지를 찾을 수 없습니다.'))
})

// app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   res.status(err.)
// })

export default app
