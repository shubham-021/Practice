import { Router } from "express"
import jwt from "jsonwebtoken"
import {user_exist , user_signin_validation} from "../middlewares/userMiddleware.js";
import User from "../db.js";
import * as z from 'zod/v4'

const userSchema = z.object({
    username : z.string(),
    firstname : z.string(),
    lastname : z.string(),
    password : z.string(),
})

const router = Router();
const jwt_password = "0123456789"

router.post('/signup' , async (req,res)=>{

    const body = req.body
    const {success} = userSchema.safeParse(body)

    if(success){
        try{
            const newUser = await User.create(body)
            res.status(201).json({
                respond : "Signed Up",
                User_id : newUser._id
            })
        }catch(err){
            res.json({
                respond : "Some error occured.Please try after some time"
            })
        }
    }else{
        res.json({
            respond : "Incorrect input"
        })
    }
})

router.post('/signin' , user_signin_validation , user_exist , async (req,res)=>{
    
    const user_id = req.user_id

    const token = jwt.sign({user_id} , jwt_password)

    try{
        res.status(201).json({
            respond : "Signed in",
            user_id,
            token
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }
})

// router.get('/seebody' , (req,res)=>{
//     console.log(req.body)
//     console.log(req)
//     console.log(req.headers)
//     res.send("hi")
// })

router.put("/update" , async (req,res)=>{
    const auth = req.headers.authorization
    const body = req.body
    if(auth && auth.startsWith("Bearer")){
        const token = auth.split(' ')[1]
        try{
            const user = jwt.verify(token , jwt_password)
            await User.findByIdAndUpdate(user.user_id , {$set: body})
            res.json({
                respond : "Updated successfully."
            })
        }
        catch(err){
            res.json({respond : "Invalid user credentials"})
        }
    }else{
        res.json({respond:"Signin to update."})
    }
})


export default router