import User from "../db.js"
import * as z from "zod/v4"

const user_signIn_schema = z.object({
    username : z.string(),
    password : z.string()
})

const userSchema = z.object({
    username : z.string(),
    firstname : z.string(),
    lastname : z.string(),
    password : z.string(),
})

async function user_exist_signUp(req,res,next){
    const username = req.body.username
    const user = await User.findOne({username})
    if(user){
        res.json({
            message : "User already exists. Please login to continue"
        })
    }else{
        req.user_id = user._id
        next()
    }
}

async function user_exist_signIn(req,res,next){
    const username = req.body.username
    const user = await User.findOne({username})
    if(!user){
        res.json({
            message : "User does not exists. SignUp first"
        })
    }else{
        req.user_id = user._id
        next()
    }
}

function user_signup_validation(req,res,next){
    const body = req.body
    const {success} = userSchema.safeParse(body)
    if(success){
        next()
    }else{
        res.json({
            message : "Invalid input."
        })
    }
}

function user_signin_validation(req,res,next){
    const username = req.body.username
    const password = req.body.password
    const {success} = user_signIn_schema.safeParse({username , password})
    if(success){
        next()
    }else{
        res.json({
            message : "Invalid input."
        })
    }
}

export {user_exist_signIn , user_signin_validation , user_exist_signUp , user_signup_validation}