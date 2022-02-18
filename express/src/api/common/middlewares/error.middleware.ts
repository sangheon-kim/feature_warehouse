import { NextFunction, Request, Response } from 'express'
import HttpException from 'src/api/common/exceptions/HttpException'

export default function errorMiddleware(
  error: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  res.status(status).send({
    success: false,
    timestamp: new Date().toISOString(),
    message,
  })
}
