import { useState, type ReactNode } from "react";
import { countContext } from "./countContext";

export const ContextProvider = ({children} : {children : ReactNode}) => {
    const [count , setCount] = useState(0)
    return (
        <countContext.Provider value={{count,setCount}}>
            {children}
        </countContext.Provider>
    )
}