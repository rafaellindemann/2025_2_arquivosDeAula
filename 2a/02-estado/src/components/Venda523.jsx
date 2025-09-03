import { useState } from "react"
import './Venda523.css'

function Venda523() {
    const[precoVenda, setPrecoVenda] = useState()

    function calcularPreco(){
        let precoCompra = Number(prompt("Preço compra: "))
        if(precoCompra < 20){
            setPrecoVenda(precoCompra * 1.45)
        }else{
            setPrecoVenda(precoCompra * 1.3)
        }
    }
  return (
    <div className="container-venda523">
        <h2>Venda - 5.23</h2>
        <button onClick={calcularPreco}>Calcular</button>

        <h3>Render condicional simples</h3>
        {precoVenda && <p>Preço de venda: R${precoVenda}</p>} 

        <h3>Render condicional ternário</h3>
        {precoVenda ? 
            <p>Preço de venda: R${precoVenda}</p> : 
            <p>Informe o preço de compra</p>
        }
    </div>
  )
}

export default Venda523