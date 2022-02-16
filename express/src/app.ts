import express, { Request, Response, NextFunction } from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import appRouter from "./api/routes/app.router"
import userRouter from "./api/routes/user.router"
import authRouter from "./api/routes/auth.roouter"

class App {
  public app: express.Application
  constructor() {
    this.app = express()
  }
}

const { app } = new App()

app.use(express.json()) // body값 파싱 미들웨어
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/", appRouter)
app.use("/user", userRouter)
app.use("/auth", authRouter)

export default app
