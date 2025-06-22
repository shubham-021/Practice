import { Admin } from "../db/index.js"

async function adminMiddleware(req,res,next) {
    //validating admin
    let username = req.headers.username
    let password = req.headers.password

    let found = await Admin.find({username , password})
    if(found.length !== 0){
        next()
    }else{
        res.json({
            msg : "No admin exist by this username and password"
        })
    }
}

export {adminMiddleware}