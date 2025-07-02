import express from "express"
import { PrismaClient } from "../prisma/generated/prisma"

const app = express()

app.use(express.json())

const client = new PrismaClient()


app.post('/signup' , async (req , res) => {
    console.log("Hi")

    const body = req.body
    try{
        const ret = await client.user.create({
            data : {
                username : body.username,
                firstname : body.firstname,
                lastname : body.lastname,
                password : body.password
            },
            select : {
                username : true
            }
        })

        res.json({
            username : ret.username
        })
    }catch(err){
        console.error(err)
        res.json({
            message : "Some error occurred"
        })
    }
})

app.listen(3000)