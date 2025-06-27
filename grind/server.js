import express from "express"
import user_router from "./router/user.js"

const app = express()

app.use(express.json())
app.use('/user' , user_router)

const PORT = 8000
app.listen(PORT , ()=>{
    console.log("Server is Listening <3")
})

