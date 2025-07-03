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
    callbacks : {}
}