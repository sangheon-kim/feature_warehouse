import express from "express"
import authController from "../controllers/auth.controller"

const authRouter = express.Router()

authRouter.get("/", authController.handleAuth)

export default authRouter
