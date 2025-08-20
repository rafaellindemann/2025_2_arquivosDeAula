import './Corpo.css'
import Textao from './Textao'
import Texto from './Texto'
import Titulo1 from './Titulo1'
import Titulo2 from './Titulo2'
function Corpo() {
  function logar(){
    let usuario = prompt("Digite seu nome de usuário:")
    if(usuario == "adm123"){
      alert("Logado com sucesso")
    }else{
      alert("Errou, o usuário era adm123")
    }
  }
  function cadastrar(){
    alert("Não tá pronta")
  }
  return (
    <div className="corpo-container">
        <Titulo1 />
        <Titulo2 texto={"Primeiro pedaço de página"} emoji={"😎"}/>
        <Texto texto={"Texto enviado para o componente via prop"} />

        <Titulo2 texto={"Segundo pedação de página"}/>
        <Textao texto={"Textão enviado para o componente pelas props que são quase como argumentos de função porque na real elas são mesmo"}/>
        <img src="./imagens/livros-react.jpg" alt="" className='imagem-corpo'/>
        <button onClick={logar} >logar</button>
        <button onClick={cadastrar} >cadastrar</button>
    </div>
  )
}

export default Corpo