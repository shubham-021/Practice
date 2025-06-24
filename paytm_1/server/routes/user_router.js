import { response, Router } from "express"
// import userMiddleware from "../middlewares/userMiddleware.js";
import User from "../db.js";

const router = Router();

router.post('/signup' , async (req,res)=>{

    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const password = req.body.password

    try{
        const newUser = await User.create({
            firstName,
            lastName,
            password
        })
        res.status(201).json({
            respond : "Signed Up",
            firstName : newUser.firstName
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }
})

export default router