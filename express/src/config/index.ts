import dotenv from 'dotenv'
import path from 'path'
import app from 'src/app'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

dotenv.config({
  path:
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../envs/.env.dev')
      : path.join(__dirname, '../envs/.env'),
})

const swaggerSpec = YAML.load(path.join(__dirname, '../../build/swagger.yaml'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
