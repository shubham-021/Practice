const express = require('express')
const bodyParser = require('body-parser')
const adminRoute = require('./routes/admin.js')
const userRoute = require('./routes/user.js')
const app = express()

app.use(bodyParser.json())
app.use('/admin', adminRoute)
app.use('/user', userRoute)

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is currently running on port ${PORT}`)
})

