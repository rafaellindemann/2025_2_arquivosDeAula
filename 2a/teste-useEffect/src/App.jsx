import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);


  //=======================================================
  // CARREGAMENTO INICIAL DOS DADOS
  useEffect(() => {
    axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      setUsuarios(response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error);
    });
  }, []); // array vazio → executa apenas 1 vez ao montar
  //=======================================================
  
  //=======================================================
  // MONITORAMENTO DE MUDANÇAS NO ESTADO
  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]); // array com estado → executa toda vez que o estado mudar
  //=======================================================
  
  function cadastrarUsuario() {
    const novoUsuario = {
      id: Date.now(),
      name: 'junin',
      email: 'jr@usuario.com',
    };
    setUsuarios([...usuarios, novoUsuario]);
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <button onClick={cadastrarUsuario}>+</button>

      {usuarios.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>
              {u.name} — {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;