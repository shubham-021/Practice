import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import { NEXT_AUTH } from "@/lib/auth";

// const handler = NextAuth({
//     providers : [
//         CredentialsProvider({
//             name : "Credential",
//             credentials : {
//                 username: { label: "Username", type: "text", placeholder: "Username" },
//                 password: { label: "Password", type: "password" , placeholder:"Password"}
//             },
//             async authorize(credentials : any){
//                 // const username = credentials.username
//                 // const password = credentials.password
//                 // const response = await prisma.user.findOne({
//                 //     where : {
//                 //         username : username,
//                 //         password : password
//                 //     }
//                 // })

//                 // if(!response){
//                 //     return null
//                 // }
//                 return {
//                     id : "1",
//                     name : "Shubham",
//                     email : "1234"
//                 }
//             }
//         })
//     ],
//     secret : process.env.NEXTAUTH_SECRET,
//     callbacks : {
//         signIn : ({user})=>{
//             if(user.email == "something@gmail.com"){
//                 return false
//             }
//             return true
//         }
//     }
// })
// whenever you want to control certain things , things additional to the components provided by nextAuth
// you can use callback provided by them
// there is many callbacks provided by them ,read documentation
// https://next-auth.js.org/configuration/callbacks

const handler = NextAuth(NEXT_AUTH)

export {handler as GET , handler as POST}

// create another file for NextAuth argument object, then use it as argument in NextAuth fn , and in 
// getServerSession context
