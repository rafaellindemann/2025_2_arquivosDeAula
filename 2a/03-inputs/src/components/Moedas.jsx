import React, { useState } from 'react'
import './Moedas.css'
function Moedas() {
    const[real, setReal] = useState('')
    const[dolar, setDolar] = useState('')
    const[euro, setEuro] = useState('')
    const cotacao = {
        dolar: 5.43,
        euro: 6.36
    }
    function converterReal(valor){
        setReal(valor)
        setDolar(valor/cotacao.dolar)
    }
    function converterDolar(valor){
        setDolar(valor)
        setReal(valor*cotacao.dolar)
    }
  return (
    <div className='moedas-container'>
        <h2>Moedas</h2>
        <label htmlFor="">Real</label>
        <input type="number" 
            value={real}
            onChange={(e) => converterReal(e.target.value)}
        />
        <label htmlFor="">Dolar</label>
        <input type="number" 
            value={dolar}
            onChange={(e) => converterDolar(e.target.value)}
        />

    </div>
  )
}
export default Moedas