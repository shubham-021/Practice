import { CountRenderer } from "./CountRenderer";
import { Button } from "./Button";
import { useSetRecoilState } from "recoil";
import { countAtom } from "../store/atoms/count";
import { Header } from "./Header";

export function Count(){

    // rather than using count from recoil state , use setCount only since using count cause unnecessary 
    // re-render of buttons , we only want to count to update and re render
    // const [count , setCount] = useRecoilState(countAtom)
    const setCount = useSetRecoilState(countAtom)

    return (
        <>
            <Button name="Decrease" fn={()=>{setCount(count => count-1)}}/>
            <CountRenderer/>
            <Button name="Increase" fn={()=>{setCount(count => count+1)}}/>
            <Header/>
            {/* <Button name="Decrease" fn={()=>{setCount(count-1)}}/>
            <CountRenderer/>
            <Button name="Increase" fn={()=>{setCount(count+1)}}/> */}
        </>
    )
}