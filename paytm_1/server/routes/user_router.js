import { Router } from "express"
import jwt from "jsonwebtoken"
import userMiddleware from "../middlewares/userMiddleware.js";
import User from "../db.js";

const router = Router();
const jwt_password = "0123456789"

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

router.post('/signin' , userMiddleware , async (req,res)=>{
    
    const firstName = req.body.firstname
    const lastName = req.body.lastname

    const token = jwt.sign({firstName,lastName} , jwt_password)

    try{
        res.status(201).json({
            respond : "Signed in",
            firstName,
            token
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }
})

router.put('/updateFirstName',userMiddleware , async (req,res)=>{
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const password = req.body.password
    const update = req.body.update

    try{
        await User.updateOne({
            firstName,
            lastName,
            password
        },{
            $set : {firstName : update }
        })
        res.status(201).json({
            respond : "Firstname updated",
            firstName : update
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }

})

router.put('/updateLastName',userMiddleware , async (req,res)=>{
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const password = req.body.password
    const update = req.body.update

    try{
        await User.updateOne({
            firstName,
            lastName,
            password
        },{
            $set : {lastName : update }
        })
        res.status(201).json({
            respond : "LastName updated",
            lastName : update
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }

})

router.put('/updatePassword',userMiddleware , async (req,res)=>{
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const password = req.body.password
    const update = req.body.update

    try{
        await User.updateOne({
            firstName,
            lastName,
            password
        },{
            $set : {password : update }
        })
        res.status(201).json({
            respond : "Firstname updated",
            password : update
        })
    }catch(err){
        res.json({
            respond : "Some error occured.Please try after some time"
        })
    }

})

export default router