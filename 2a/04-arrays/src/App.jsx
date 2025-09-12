import { useState } from 'react'
import './App.css'
function App() {
  const [pessoas, setPessoas] = useState([
    {id: 1, nome: "Clara", idade: 72},
    {id: 2, nome: "Gema", idade: 78},
    {id: 3, nome: "Bob Esponja", idade: 68},
    {id: 11, nome: "Dona Bete", idade: 72},
    {id: 21, nome: "Dr Auzio", idade: 78},
    {id: 31, nome: "Sarumano", idade: 68},
  ])
  function cadastrar(){
    let pessoa = {
      id: Date.now(),
      nome: prompt("Nome:"),
      idade: Number(prompt("Idade: ")),
    }
    console.log(pessoa);
    // pessoas.push(pessoa) nunca faça isso com um useState
    setPessoas([pessoa, ...pessoas])
  }
  return (
    <div>
      <h1>Arrays</h1>
      <div className="formCadastro">
        <input type="text" />
        <input type="text" />
        <button onClick={cadastrar}>Cadastrar</button>
      </div>
      <div className="container-cards">
        {pessoas.map((pessoa) => (
          <div key={pessoa.id} className="card-pessoa">
            <h2>{pessoa.nome}</h2>
            <p>Idade: {pessoa.idade}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App