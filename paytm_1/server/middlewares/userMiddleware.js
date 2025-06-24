import User from "../db.js"


async function find_userName(username){
    const user = await User.findOne({username})
    return user === null
}


async function userMiddleware(req,res,next){
    const username = req.body.username
    const find = await find_userName(username)
    if(find == true){
        next()
    }else{
        res.json({
            respond : "Username exists"
        })
    }
}

export default userMiddleware