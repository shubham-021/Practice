import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sh7bh:Sh7bham007%40@cluster0.okmep.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
})

const User =  mongoose.model("User" , userSchema)

export default User