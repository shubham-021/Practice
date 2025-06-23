import { Router } from "express"
import {adminMiddleware} from '../middlewares/admin.js'
import { Admin , Courses } from "../db/index.js" //or you can do require('../db') <-- work only if db contains a single file
const router = Router()

router.post('/signUp',async (req,res)=>{
    //signup logic for admin
    const username = req.body.username
    const password = req.body.password

    let foundAdmin = await Admin.findOne({username})

    if(foundAdmin){
        res.json({
            msg : "Username already exist , try another one"
        })
    }else{
        Admin.create({
            username,
            password
        })

        res.json({
            msg : "Admin created successfully"
        })
    }
    

})

router.post('/courses',adminMiddleware,async (req,res)=>{
    //course creation 
    //validating if admin exist or not through middleware
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let imageLink = req.body.imageLink

    

    let admin = await Admin.findOne(req.header.username)
    let adminId = admin._id
    const count = await Courses.countDocuments(); 
    let courseId = count + 1

    Courses.create({
        title,
        description,
        price,
        imageLink,
        courseId,
        adminId
    })

    res.json({
        msg : "Course created successfully",
        course : {
            title,
            description,
            price,
            imageLink,
            courseId
        }
    })



})

router.get('/courses',adminMiddleware,async(req,res)=>{
    //logic for fetching courses
    //validating if admin exist or not through middleware
    let username = req.headers.username
    let admin = await Admin.find({username})
    let adminId = admin._id

    let allCourses = await Courses.find(adminId)
    let sendCourseDetails = allCourses.map((element) => ({
            title : element.title,
            description : element.description,
            price : element.price,
            imageLink : element.imageLink
    }));
    
    res.json({
        availableCourses : sendCourseDetails
    })
})

export default router ; 
