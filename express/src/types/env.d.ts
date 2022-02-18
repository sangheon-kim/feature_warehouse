import { Router } from 'express'

interface Controller {
  path: string
  router: Router
  init(): void
}
