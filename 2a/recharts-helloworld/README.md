 

---

# Projeto: Dashboard de Dinossauros com Recharts

Este projeto demonstra o uso da biblioteca **Recharts** em um ambiente **React + Vite**, utilizando dados fictícios de um “mercado de dinos” para visualizar informações como valor, evolução de preço e estatísticas gerais.

O objetivo é apresentar exemplos claros, didáticos e personalizáveis de gráficos comuns em dashboards: gráfico de barras, gráfico de linha, comparações e análise temporal.

---

# O que este projeto contém

## 1. Gráficos desenvolvidos

### **Gráfico de Barras – Valor dos Dinos**

Local: `DinoBarChart.jsx`
Explica e demonstra como criar um gráfico comparando valores individuais de cada espécie.

Usa:

* `BarChart`
* `Bar`
* `XAxis` com rotação de texto
* `ResponsiveContainer`
* `Tooltip`

---

### **Gráfico de Linha Temporal – Evolução de Preço**

Local: `DinoPriceTimeline.jsx`
Exibe a variação do preço de um único dino ao longo do tempo, filtrado pelo `dinoId`.

Usa:

* `LineChart`
* `Line`
* `CartesianGrid`
* `XAxis` com formatação de datas
* `Tooltip` com dados formatados

Esse componente recebe:

```js
<DinoPriceTimeline vendas={vendas} dinoId={1} />
```

---

## 2. Dados utilizados (seed estático)

### `dinos`

Cada objeto representa um dinossauro, com atributos internos e valor estimado em Pila.

### `vendas`

Registro temporal dos preços praticados em diferentes datas, permitindo análises como:

* tendência de preço,
* hype inicial,
* queda gradual,
* estabilização do mercado.

Esses dados foram estruturados para permitir exemplos reais de dashboard, com múltiplos cenários interpretáveis.

---

# Como executar o projeto

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor Vite:

```
npm run dev
```

3. Acesse:

```
http://localhost:5173
```

---

# Por que Recharts?

Recharts é uma biblioteca de gráficos para React baseada em SVG e construída sobre o D3.js, mas com uma API declarativa que facilita muito o desenvolvimento de dashboards.
Ela permite criar gráficos responsivos, combinar múltiplas séries e customizar praticamente qualquer elemento visual.

---

# Componentes Recharts mais usados no projeto

### `ResponsiveContainer`

Responsável por tornar o gráfico fluido e adaptado ao tamanho do contêiner.

### `BarChart` e `LineChart`

Contêineres principais para gráficos de barra e linha.

### `XAxis` e `YAxis`

Controlam os eixos de categoria e eixo numérico.

### `Tooltip`

Exibe informações quando o usuário passa o mouse sobre pontos ou barras.

### `CartesianGrid`

Desenha a grade de fundo, facilitando leitura.

### `Bar` e `Line`

Representam visualmente os dados plotados.

---

# Estrutura recomendada para estudos

Este projeto foi criado com fins educativos. Para aprofundar:

* Leia o README de cada componente (`DinoBarChart` e `DinoPriceTimeline`) — ambos explicam em detalhes cada elemento do gráfico.
* Explore variações: barras horizontais, linhas múltiplas, gráficos de radar e de pizza.
* Experimente conectar filtros, selects e animações.
* Avalie transformar dados crus em séries temporais agregadas (média, soma, por período).

---

# Links úteis

Documentação oficial:

* [https://recharts.github.io/](https://recharts.github.io/)
* [https://recharts.github.io/en-US/guide/](https://recharts.github.io/en-US/guide/)
* [https://recharts.github.io/en-US/examples/](https://recharts.github.io/en-US/examples/)

Conteúdos didáticos:

* [https://www.youtube.com/watch?v=WEitNRycnpI](https://www.youtube.com/watch?v=WEitNRycnpI)
* [https://www.youtube.com/watch?v=CO8STI6kNwo](https://www.youtube.com/watch?v=CO8STI6kNwo)
* [https://www.youtube.com/watch?v=Fu_YFp-9xoQ](https://www.youtube.com/watch?v=Fu_YFp-9xoQ)

---

# Possíveis expansões do projeto

* Gráfico de radar comparando atributos dos dinos.
* Stacked Bar para composição de status.
* Multi-line chart para comparar evolução de preços entre espécies.
* Área acumulada mostrando receita total ao longo do tempo.
* Inspeção detalhada ao clicar sobre barras ou pontos.
* Dashboard completo combinando vários gráficos em layout responsivo.

---

