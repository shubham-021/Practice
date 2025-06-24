import { Router } from "express";
import userRouter from "./user_router.js"

const route = Router()

route.use('/users' , userRouter)

export default route