const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Para carregar a chave de API de um arquivo .env

const app = express();
const port = 3000;

app.use(express.json());

// Acessa sua chave de API de uma variável de ambiente por segurança
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('API_KEY não definida. Por favor, adicione-a em um arquivo .env.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Endpoint para a API
app.post('/gemini-query', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send({ error: 'O campo "prompt" é obrigatório.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).send({ response: text });

  } catch (error) {
    console.error('Erro na chamada da API Gemini:', error);
    res.status(500).send({ error: 'Erro interno ao processar a requisição.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});