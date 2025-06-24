import User from "../db.js"


async function find_userName(firstName , lastName){
    const user = await User.findOne({firstName , lastName})
    return user === null
}


async function userMiddleware(req,res,next){
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const find = await find_userName(firstname,lastname)
    if(find == true){
        res.json({
            respond : "User does not exists. SignUp first"
        })
    }else{
        next()
    }
}

export default userMiddleware