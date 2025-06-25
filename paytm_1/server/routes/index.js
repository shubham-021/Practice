import { Router } from "express";
import userRouter from "./user_router.js"
import accountRouter from "./account_router.js"

const route = Router()

route.use('/users' , userRouter)
route.use('/account' , accountRouter)

export default route