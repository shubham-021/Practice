import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
    providers : [
        CredentialsProvider({
            name : "Credential",
            credentials : {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" , placeholder:"Password"}
            },
            async authorize(credentials : any){
                // const username = credentials.username
                // const password = credentials.password
                // const response = await prisma.user.findOne({
                //     where : {
                //         username : username,
                //         password : password
                //     }
                // })

                // if(!response){
                //     return null
                // }
                return {
                    id : "1",
                    name : "Shubham",
                    email : "1234"
                }
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        session : ({session,token,user}:any)=>{
            console.log(session)
            if(session && session.user){
                session.user.id = token.sub // sub==id --> ('do search')
                // session usually do not contain id , so we injected the id from token
            }
            return session
        }
    }
}