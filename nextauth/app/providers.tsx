"use client"
import { SessionProvider } from "next-auth/react"
import React from "react"

export function Providers({children}:{children : React.ReactNode}){
    return <SessionProvider>
        {children}
    </SessionProvider>
}


// to use the context around session , must wrap all components in SessionProvider , we can't just wrap 
// the children in which are being passed down in root layout.tsx since it is a server component, and 
// SessionProvider is a client side thing so we have to make another file for context providers, and 
// pass down the children components in it. Also make this a client side thing using "use client".
// Wrap children in layout.tsx with this provider component.