import express from "express"
import userController from "../controllers/user.controller"

const userRouter = express.Router()

userRouter.get("/", userController.handleUser)

export default userRouter
