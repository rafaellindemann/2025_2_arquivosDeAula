import { useState } from "react"


function Comp(){
    const[valor, setValor] = useState()
    const[preco, setPreco] = useState(10)

    return (
        <div>
            {valor && 
                <>
                    {valor>=preco ? <p>Compra</p> : <p>Não compra</p>}
                </>
            }

            {/* {media && 
                <>
                    {media>=7 ? <p>Passou</p> : <p>Reprovado</p>}
                </>
            } */}
        </div>
    )
}

export default Comp