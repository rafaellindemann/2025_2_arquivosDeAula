import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const macaRef = useRef(null)
  const peraRef = useRef(null)
  const[inputMaca, setInputMaca] = useState('')
  const[inputPera, setInputPera] = useState('')

  useEffect(()=>{
    function handleKeyDown(e){
      if(e.key == 'm'){
        e.preventDefault()
        macaRef.current?.focus()
      }
      if(e.key == 'p'){
        e.preventDefault()
        peraRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <label htmlFor="">Maçã
        <input type="text" 
          value={inputMaca}
          onChange={(e)=>setInputMaca(e.target.value)}
          ref={macaRef}
        />
      </label>
      <label htmlFor="">Pera
        <input type="text" 
          value={inputPera}
          onChange={(e)=>setInputPera(e.target.value)}
          ref={peraRef}
        />
      </label>
      <button>Calcular</button>
    </div>
  )
}

export default App
