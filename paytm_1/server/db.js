import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sh7bh:Sh7bham007%40@cluster0.okmep.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    password : String
})

const User =  mongoose.model("User" , userSchema)

export default User