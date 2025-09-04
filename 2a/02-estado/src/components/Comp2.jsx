import React, { useState } from 'react'

function Comp2() {
    const[nota1, setNota1] = useState(1)
    const[nota2, setNota2] = useState(2)
    const[nota3, setNota3] = useState(10)
  return (
    <div>
        <h3>render condicional dos erros aninhados</h3>
        {!nota1 ? <p>Bota nota 1 aí</p> : <>
            {!nota2 ? <p>Bota 2</p> : 
                <>{!nota3 && <p>Bota três</p>}</>
            }
        </>}
    </div>
  )
}

export default Comp2