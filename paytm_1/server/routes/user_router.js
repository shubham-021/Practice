import { Router } from "express"
import jwt from "jsonwebtoken"
import {user_exist_signIn , user_signin_validation , user_exist_signUp , user_signup_validation} from "../middlewares/userMiddleware.js";
import { User , Account } from "../db.js";

const router = Router();
const jwt_password = "0123456789"

router.post('/signup' , user_signup_validation , user_exist_signUp, async (req,res)=>{
        try{
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
                message : "Some error occured.Please try after some time"
            })
        }
})

router.post('/signin' , user_signin_validation , user_exist_signIn , async (req,res)=>{
    
    const user_id = req.user_id

    const token = jwt.sign({user_id} , jwt_password)

    try{
        res.status(201).cookie().json({
            message : "Signed in",
            user_id,
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

router.put("/update" , async (req,res)=>{
    const auth = req.headers.authorization
    const body = req.body
    if(auth && auth.startsWith("Bearer")){
        const token = auth.split(' ')[1]
        try{
            const user = jwt.verify(token , jwt_password)
            await User.findByIdAndUpdate(user.user_id , {$set: body})
            res.json({
                message : "Updated successfully."
            })
        }
        catch(err){
            res.json({ message : "Invalid user credentials" })
        }
    }else{
        res.json({ message:"Signin to update." })
    }
})

router.get("/bulk" , async (req,res)=>{
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