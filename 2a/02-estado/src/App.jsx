import { useState } from 'react'
import './App.css'
import Venda523 from './components/Venda523'
import Comp from './components/Comp'
import Comp2 from './components/Comp2'
import Garcom from './components/Garcom'

function App() {// lembrem de não usar variáveis aqui :D
  const [numero, setNumero] = useState(0)
  const [username, setUsername] = useState()
  
  function incrementar() {
    setNumero(numero + 1)
  }
  function decrementar() {
    setNumero(numero - 1)
  }
  function logar(){
    let nome = prompt("Digite seu nome:")
    setUsername(nome)
  }

  return (
    <>
      <Garcom />
      <Comp2 />
      <Comp />
      {/* {username && <p>render condicional</p>} */}

      {username && 
        <p className='user'>
          Olá {username}
        </p>
      }
      <button onClick={logar}>logar</button>
      <h1>Estados</h1>
      <button onClick={decrementar}>-</button>
      {numero}
      <button onClick={incrementar}>+</button>

      <Venda523 />
    </>
  )
}

export default App
