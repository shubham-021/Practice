import { User } from "../db/index.js"

async function userMiddleware(req,res,next){
    //validating users
    let username = req.headers.username
    let password = req.headers.password

    let found = await User.find({username , password})
    if(found.length !== 0){
        next()
    }else{
        res.json({
            msg : "No user exist by this username and password"
        })
    }
}

export {userMiddleware}