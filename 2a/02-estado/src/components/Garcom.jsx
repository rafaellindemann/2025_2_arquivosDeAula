import React, { useState } from 'react'

function Garcom() {
    const[resultado, setResultado]=useState()
    function calcularEmprestimo(){
        const salario = Number(prompt("Salário: "))
        const emprestimo = Number(prompt("Empréstimo: "))
        const prestacoes = Number(prompt("Número de prestações: "))
        const valorPrestacao = emprestimo / prestacoes

        if(valorPrestacao <= salario*0.3){
            // alert("Deu boa")
            setResultado("Empréstimo concedido")
        }else{
            // alert("Deu ruim")
            setResultado("Empréstimo negado")
        }

    }
  return (
    <div>
        <h2>Empréstimos Banco da Praça!</h2>
        {resultado}
        <button onClick={calcularEmprestimo}>calcular empréstimo</button>
    </div>
  )
}

export default Garcom