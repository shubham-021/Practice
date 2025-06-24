import User from "../db.js"
import * as z from "zod/v4"

const user_signIn_schema = z.object({
    username : z.string(),
    password : z.string()
})

async function user_exist(req,res,next){
    const username = req.body.username
    const user = await User.findOne({username})
    if(!user){
        res.json({
            respond : "User does not exists. SignUp first"
        })
    }else{
        req.user_id = user._id
        next()
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
            respond : "Incorrect input type"
        })
    }
}

export {user_exist , user_signin_validation}