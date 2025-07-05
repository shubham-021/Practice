interface ButtonProps {
  name: string;
  fn: React.MouseEventHandler<HTMLDivElement>;
}


export function Button({name , fn} : ButtonProps){
    
    return (
        <div onClick={fn} className="m-4 hover:cursor-pointer border-s-yellow-50 border-2 rounded-md pl-2 pr-2">
            {name}
        </div>
    )
}