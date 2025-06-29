import { Router } from "express"
import jwt from "jsonwebtoken"
import { JWT_PASS } from "../config.js";
import {user_exist_signIn , user_signin_validation , user_exist_signUp , user_signup_validation} from "../middlewares/userMiddleware.js";
import authMiddlware from "../middlewares/authMiddleware.js"
import { User , Account } from "../db.js";

const router = Router();

router.post('/signup' , user_signup_validation , user_exist_signUp, async (req,res)=>{
        try{
            const body = req.body
            const newUser = await User.create(body)
            res.status(201).json({
                message : "Signed Up",
                User_id : newUser._id
            })

            await Account.create({
                userId : newUser._id,
                balance : 1+Math.random()*1000
            })

        }catch(err){
            res.json({
                message : "Some error occured.Please try after some time",
                error : err?.message || err
            })
        }
})

router.post('/signin' , user_signin_validation , user_exist_signIn , async (req,res)=>{
    
    const userId = req.user_id

    const token = jwt.sign({userId} , JWT_PASS)

    try{
        res.status(201).json({
            message : "Signed in",
            userId,
            token
        })
    }catch(err){
        res.json({
            message : "Some error occured.Please try after some time"
        })
    }
})

// router.get('/seebody' , (req,res)=>{
//     console.log(req.body)
//     console.log(req)
//     console.log(req.headers)
//     res.send("hi")
// })

router.put("/update" , authMiddlware , async (req,res)=>{
        try{
            const body = req.body
            await User.findByIdAndUpdate(req.userId , {$set: body})
            res.json({
                message : "Updated successfully."
            })
        }
        catch(err){
            res.json({ message : "Some error occurred while updating" })
        }
})

router.get("/bulk" , authMiddlware , async (req,res)=>{
    const filter = req.query.filter || ""

    // const users = await User.find({
    //     $or: [{firstname: filter},{lastname: filter}]
    // })

    const users = await User.find({
        $or:[{firstname:{$regex : filter , $options : 'i'}},{lastname:{ $regex :filter , $options : 'i'}}]
    })

    res.json({
        user : users.map((user)=>({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            userId : user._id
        }))
    })
}) 


export default router