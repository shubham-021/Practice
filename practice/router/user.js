import { Router } from "express";

const router = Router()

router.get('/auth' , (req , res)=>{
    res.end("hi")
})

export default router 