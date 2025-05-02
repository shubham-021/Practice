const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sh7bh:Sh7bham007%40@cluster0.okmep.mongodb.net/')

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
})

const userSchema = new mongoose.Schema({
    username : String,
    password : String
})

const purchasedSchema = new mongoose.Schema({
    username : String,
    title : String,
    courseId : Number
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    courseId : Number,
    adminId : String,
})

const Admin = mongoose.model('Admin' , adminSchema)
const User = mongoose.model('User' , userSchema)
const Courses = mongoose.model('Courses' , courseSchema)
const PurchasedCourses = mongoose.model('PurchasedCourses' , purchasedSchema)

module.exports = {
    Admin,
    User,
    Courses,
    PurchasedCourses
}
