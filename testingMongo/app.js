import express from 'express'
import bodyParser from 'body-parser'
import adminRoute from './routes/admin.js'
import userRoute from './routes/user.js'
const app = express()

app.use(bodyParser.json())
app.use('/admin', adminRoute)
app.use('/user', userRoute)

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is currently running on port ${PORT}`)
})

