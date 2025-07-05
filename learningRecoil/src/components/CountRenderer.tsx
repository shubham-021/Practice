import { useRecoilValue } from "recoil"
import { countAtom } from "../store/atoms/count"

export function CountRenderer(){

    const count = useRecoilValue(countAtom)  
    // const [count , setCount] = useRecoilState(countAtom)

    return (
        <div>
            <b>
                {count}
            </b>
        </div>
    )
}