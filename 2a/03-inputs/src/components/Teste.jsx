import React from 'react'

function Teste() {

    
    function testar(){
        let ano = Number(prompt("ano: "))

        if( (ano%4==0 && ano%100!==0) || ano%400===0 ){
            alert("bissexto")
        }else{
            alert("trissexto")
        }

    }

  return (
    <div>
        <h2>Teste</h2>
        <button onClick={testar}>testar</button>
    </div>
  )
}

export default Teste