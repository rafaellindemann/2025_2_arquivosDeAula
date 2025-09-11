// import './App.css'
// import Pessoa from './components/Pessoa'

import { useState } from "react";

function Pessoas() {
  const pessoas = [
    { id: 1, nome: 'Dona Bete', idade: 72 },
    { id: 2, nome: 'Kowalski', idade: 30 },
    { id: 3, nome: 'Guilherme Portões', idade: 40 },
    { id: 4, nome: 'Estevão Trampos', idade: 40 },
    { id: 5, nome: 'Heitor Tuga', idade: 33 },
    { id: 6, nome: 'Pe. Ernan Buco', idade: 57 },
    { id: 7, nome: 'Capitão Ganso', idade: 46 },
    { id: 8, nome: 'Junin', idade: 19 },
    { id: 9, nome: 'Gael', idade: 29 },
    { id: 10, nome: 'Juca', idade: 21 },
    { id: 11, nome: 'Romero Brique', idade: 42 },
    { id: 12, nome: 'Sarumano', idade: 78 },
    { id: 13, nome: 'Cida', idade: 66 },
    { id: 14, nome: 'Márcia', idade: 34 },
    { id: 15, nome: 'Pedro Barros', idade: 31 },
    { id: 16, nome: 'Harry Plotter', idade: 36 },
    { id: 17, nome: 'Lucio Fernando', idade: 33 },
    { id: 18, nome: 'Ron Roni', idade: 26 },
    { id: 19, nome: 'Waldisney', idade: 24 },
    { id: 20, nome: 'Rita Aline', idade: 39 }
  ];

  const[cont, setCont] = useState(0)
  
  function adicionar(){
    pessoas.push({ id: 21, nome: 'Dr Auzio', idade: 72 })
    console.log(pessoas);
    
  }
  return (
    <>
        <button onClick={adicionar}>Add</button>
        <button onClick={() => setCont(cont+1)}>render - {cont}</button>
      {pessoas.map((pessoa) => (
        // <Pessoa key={pessoa.id} nome={pessoa.nome} idade={pessoa.idade}/>
        <div key={pessoa.id} style={{ color: 'blue', fontSize: '12px', border: '1px solid blue', margin: '5px' }}>
            <h3>{pessoa.nome}</h3>
            <p>{pessoa.idade}</p>
            <p>{pessoa.id}</p>
        </div>

      ))}
    </>
  )
}
export default Pessoas