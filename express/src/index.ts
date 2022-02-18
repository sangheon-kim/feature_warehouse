import 'src/config'
import App from './app'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

/** Controllers */
import AppController from 'src/api/controllers/app.controller'
import AuthController from 'src/api/controllers/auth.controller'
import UserController from 'src/api/controllers/user.controller'

const PORT = Number(process.env.PORT) || 8000

const app = new App(
  [new AppController(), new AuthController(), new UserController()],
  PORT
)

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

app.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen()
