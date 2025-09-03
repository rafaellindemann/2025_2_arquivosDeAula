import React, { useState } from 'react'

function Conceito524() {
    const[conceito, setConceito] = useState()
    function calcularMedia(){
        setConceito('A')
    }
  return (
    <div>
        Conceito524
        {conceito}
    </div>
  )
}

export default Conceito524