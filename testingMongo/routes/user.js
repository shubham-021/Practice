import { Router } from 'express'
const router = Router()
import { User , Courses , PurchasedCourses } from '../db/index.js'
import {userMiddleware} from '../middlewares/user.js'

router.post('/signUp',async(req,res)=>{
    //signup for users
    let username = req.body.username
    let password = req.body.password

    let foundUser = await User.findOne({username})
    console.log(foundUser)

    if(foundUser){
        res.json({
            msg : "Username already exist , try another one"
        })
    }else{
        User.create({
            username,
            password
        })
    
        res.json({
            msg : "User created successfully"
        })
    }
})

router.get('/courses',userMiddleware,async (req,res)=>{
    //check if user exists or not 
    const allCourses = await Courses.find({})
    const availableCourses = allCourses.map((e)=> ({
            title : e.title,
            description : e.description,
            price : e.price,
            imageLink : e.imageLink,
            courseId : e.courseId
    }))
    
    res.json({
        availableCourses
    })
})

router.post('/courses/:courseId',userMiddleware,async(req,res)=>{
    let courseId = req.params.courseId
    let username = req.headers.username

    let course = await Courses.find({courseId})
    let title = course[0].title

    PurchasedCourses.create({
        username,
        title,
        courseId
    })

    res.json({
        msg : "Course purchased successfully"
    })
})

router.get('/purchasedCourses',userMiddleware,async(req,res)=>{
    //returns all purchased courses
    let username = req.headers.username
    let allPurchasedCourses = await PurchasedCourses.find({username})
    let coursesName = allPurchasedCourses.map((e)=>({title : e.title}))

    res.json({
        myCourses : coursesName
    })
})

export default router