import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path:
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../envs/.env.dev')
      : path.join(__dirname, '../envs/.env'),
})
