import { Router } from "express";
import { Account } from "../db";
import mongoose from "mongoose";

const router = Router()

//add auth middleware
router.get('/balance' , async (req,res)=>{
    const account = await Account.find({
        userId : req.userId
    })

    res.json({
        balance : account.balance
    })
})

//add auth middleware
router.post("/transfer",async (req,res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()

    try{
        const {amount,to} = req.body

        const account = await Account.find({userId:req.userId}).session(session)

        if(!account || account.balance<amount){
            await session.abortTransaction()
            return res.status(400).json({
                message : "Insufficient balance"
            })
        }

        const toAccount = await Account.find({userId:to}).session(session)

        if(!toAccount){
            await session.abortTransaction()
            return res.status(400).json({
                message : "Invalid account"
            })
        }

        await Account.updateOne({userId:req.userId} , { $inc : { balance : -amount }}).session(session)   
        await Account.updateOne({userId:to} , { $inc : { balance : amount }}).session(session)   

        await session.commitTransaction()
        session.endSession()
        res.json({
            message : "Transaction successful"
        })
    }catch(err){
        await session.abortTransaction()
        session.endSession()
        console.error(err)
        res.status(500).json({
            message : "Transaction failed",
            error : err.message
        })
    }
    
})

export default router