import dotenv from 'dotenv'
import App from './app'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

dotenv.config({
  path:
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../.env.dev')
      : path.join(__dirname, '../.env'),
})

/** Controllers */
import AppController from 'src/api/controllers/app.controller'
import AuthController from 'src/api/controllers/auth.controller'
import UserController from 'src/api/controllers/user.controller'
import PostsController from './api/controllers/posts.controller'

const PORT = Number(process.env.PORT) || 8000

const app = new App(
  [
    new AppController(),
    new AuthController(),
    new UserController(),
    new PostsController(),
  ],
  PORT
)

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

app.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen()
