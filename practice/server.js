import express from "express"
import router from "./router/user.js"

const app = express()

app.use('/user' , router)

const PORT = 8000
app.listen(PORT , ()=>{
    console.log("Server is Listening <3")
})

