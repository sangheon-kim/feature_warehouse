import express from "express"
import appController from "../controllers/app.controller"

const appRouter = express.Router()

appRouter.get("/", appController.handleHome)

export default appRouter
