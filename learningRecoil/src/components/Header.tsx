import { useRecoilValue } from "recoil"
import { evenSelector } from "../store/atoms/count"
// import { countAtom } from "../store/atoms/count"

export function Header(){
    // const count = useRecoilValue(countAtom)
    const isEven = useRecoilValue(evenSelector)
    return(
        <div>
            {(!isEven)?"It is even":null}
        </div>
    )
}