import './App.css'
import React, { use, useEffect, useState } from 'react'


function useDebouncer(value , time){
  const [debounceValue , setDebounceValue] = useState(value)

  useEffect(()=>{
    const timerId = setTimeout(()=>{
      setDebounceValue(value)
    },time)

    return ()=>{
      clearInterval(timerId)
    }
  },[value])

  return debounceValue
}

function App(){

  const [inputValue , setInputValue] = useState('')
  const value = useDebouncer(inputValue , 500)

  return(
    <>
    <h1>Debounced value : {value}</h1>
    <input onChange={(e)=>{setInputValue(e.target.value)}} type="text" />
    </>
  )

}


export default App
