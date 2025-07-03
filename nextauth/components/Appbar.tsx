"use client"
// import { useRouter } from "next/navigation"
import { signIn,signOut, useSession } from "next-auth/react"


// export function Appbar(){
//     const router = useRouter()
//     return (
//         <div>
//             <button className="hover:cursor-pointer" onClick={()=>{
//                 router.push("/api/auth/signin")
//             }}>
//                 SignIn
//             </button>
//         </div>
//     )
// }

export function Appbar(){
    const session = useSession()
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <button className="hover:cursor-pointer" onClick={()=>signIn()}>SignIn</button>
            <button className="hover:cursor-pointer" onClick={()=>signOut()}>SignOut</button>
            {JSON.stringify(session)}
        </div>
    )
}