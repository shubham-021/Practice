import mongoose from "mongoose";
import { MONGO_DB_URI } from "./config.js"

mongoose.connect(MONGO_DB_URI)

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    firstname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    balance : Number
})

const User =  mongoose.model("User" , userSchema)
const Account = mongoose.model("Account" , accountSchema)

export  {User,Account}