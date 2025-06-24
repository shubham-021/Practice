import express from "express"
import userRouter from "./routes/user_router.js"

const app = express()
app.use(express.json())
app.use('/api/v1/user', userRouter)

app.listen(3000 , ()=>{
    console.log("Server is all ears <3")
})