import express, { Request, Response, NextFunction } from "express"
import path from "path"
import "src/config"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json()) // body값 파싱 미들웨어
app.use(cookieParser())

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Sangheon App")
})

app.post("/profile", (req, res) => {
  console.log(req.cookies)
  res.end()
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
