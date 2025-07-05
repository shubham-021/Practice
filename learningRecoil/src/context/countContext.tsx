import { createContext } from "react";

type countType = {
    count : number,
    setCount : (val:number) => void
}

export const countContext = createContext<countType>({
    count : 0,
    setCount : ()=>{}
});