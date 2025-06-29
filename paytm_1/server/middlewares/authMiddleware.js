import { JWT_PASS } from "../config.js"
import jwt from "jsonwebtoken"


function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({
            message : "Invalid LogIn"
        })
    }

    const token = authHeader.split(" ")[1]
    
    try{
        const decoded = jwt.verify(token , JWT_PASS)
        // console.log(decoded)

        if(decoded.userId){
            req.userId = decoded.userId;
            next()
        }else{
            return res.status(403).json({
                message : "User not authenticated"
            })
        }
    }catch(err){
        return res.status(403).json({
            message : "Some error occurred while authenticating"
        })
    }
}

export default authMiddleware