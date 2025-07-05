import { CountRenderer } from "./CountRenderer";
import { Button } from "./Button";
import { useRecoilState } from "recoil";
import { countAtom } from "../store/atoms/count";

export function Count(){

    const [count , setCount] = useRecoilState(countAtom)

    return (
        <>
            <Button name="Decrease" fn={()=>{setCount(count-1)}}/>
            <CountRenderer/>
            <Button name="Increase" fn={()=>{setCount(count+1)}}/>
        </>
    )
}