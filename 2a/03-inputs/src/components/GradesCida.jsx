import { useState } from "react"
import './GradesCida.css'
function GradesCida() {
    const[inputAltura, setInputAltura]=useState('')
    const[inputLargura, setInputLargura]=useState('')
    const[inputComprimento, setInputComprimento]=useState('')
    const[resultado, setResultado]=useState()
    function calcularPreco(){
        setResultado((Number(inputLargura)+Number(inputComprimento))*2 * inputAltura * 80)
    }
  return (
    <div className="gradescida-container">
        <h2>GradesCida</h2>
        <label htmlFor="">Altura</label>
        <input type="number" 
            value={inputAltura}
            onChange={(e) => setInputAltura(e.target.value)}
        />
        <label htmlFor="">Largura</label>
        <input type="number" 
            value={inputLargura}
            onChange={(e) => setInputLargura(e.target.value)}
        />
        <label htmlFor="">Comprimento</label>
        <input type="number" 
            value={inputComprimento}
            onChange={(e) => setInputComprimento(e.target.value)}
        />
        <button onClick={calcularPreco}>Calcular preço</button>
        {resultado}
    </div>
  )
}
export default GradesCida