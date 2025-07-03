// import { useSession } from "next-auth/react";

// export default function(){
//     const session = useSession()
//     return <div>
//         User Component
//         {JSON.stringify(session)}
//     </div>
// }

// cant do this here , since it is a server side component and useSession is being imported from 
// "next-auth/react" which is a client side thing. Instead do this ->

import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function(){
    // const session = await getServerSession()
    const session = await getServerSession(NEXT_AUTH)
    return <div className="bg-black h-screen w-screen flex flex-col justify-center items-center text-white">
        <div>User Component</div>
        <div>{JSON.stringify(session)}</div>
    </div>
}

// using NEXT_AUTH