
function App() {

  const cell = []
  const a = 'a'
  for(let i=0; i<5; i++){
    let b = a[i]
    cell.push(<div className="h-[40px] w-[40px] bg-cyan-400">{b}</div>)
  }
  
  return (
    <div className="h-screen w-screen bg-black gap-4 flex justify-center items-center">
      {cell}
    </div>
  )
}

export default App
