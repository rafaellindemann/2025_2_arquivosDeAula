import { useState } from 'react';
import './App.css';

function App() {
  // Estado para os campos do formulário
  const [orderId, setOrderId] = useState('ABC-123');
  const [sku, setSku] = useState('KIT-01');

  // Estado para armazenar a resposta da API
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    const payload = {
      payload: {
        orderId: orderId,
        sku: sku,
      },
      callbackUrl: 'http://localhost:3333/callback',
    };

    try {
      // Fazendo a requisição POST
      const res = await fetch('http://98.80.66.165:3000/docs/queue/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Teste de Requisição POST</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="orderId">Order ID:</label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            id="sku"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {/* Exibe a resposta ou erro */}
      <div className="response-area">
        {loading && <p>Carregando...</p>}
        {error && <p className="error">Erro: {error}</p>}
        {response && (
          <div>
            <h2>Resposta da API:</h2>
            {console.log(response)}
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;