https://recharts.github.io/en-US/examples/SimpleLineChart/


---

# Gráfico de Linha Temporal com Recharts – Explicação do Componente

Este componente implementa um **gráfico de linha temporal** usando a biblioteca **Recharts**, com foco em exibir a evolução do preço de um único dino ao longo do tempo. Ele recebe dois dados: o array completo de vendas e o `id` do dino que deve ser analisado.

A ideia é visualizar como o mercado daquele dino se comportou: lançamento, hype, queda e estabilização de preço.

---

# Objetivo do gráfico

A função desse gráfico é responder à pergunta:

**“Como o preço deste dino evoluiu ao longo das datas registradas?”**

Esse tipo de visualização é útil para:

* entender tendências de preço,
* detectar comportamentos de lançamento,
* visualizar queda ou recuperação de valor,
* analisar economia dentro de jogos ou simulações,
* demonstrar dados de forma clara em dashboards.

O gráfico usa o tempo como eixo X (datas) e o preço em Pila como eixo Y.

---

# Estrutura Geral do Componente

O componente é composto pelas seguintes partes principais:

1. **Transformação dos dados** — filtragem, ordenação e padronização da série temporal.
2. **Contêiner visual externo** — define o espaço físico onde o gráfico será renderizado.
3. **`ResponsiveContainer`** — garante que o gráfico se adapte ao tamanho disponível.
4. **`LineChart`** — componente principal do Recharts que organiza as demais camadas.
5. **Eixos, grade, tooltip e linha de dados** — definem a aparência e comportamento do gráfico.

---

# Detalhamento do Código

## 1. Filtragem e preparação dos dados

Dentro do `useMemo`:

```jsx
const serie = useMemo(() => {
  return vendas
    .filter(v => v.dino_id == dinoId)
    .sort((a, b) => a.data.localeCompare(b.data))
    .map(v => ({ data: v.data, valor: v.valor }))
}, [vendas, dinoId])
```

Esse trecho:

* filtra apenas as vendas do dino selecionado,
* ordena por data,
* transforma cada item em `{ data, valor }` para o gráfico.

O `useMemo` garante que esse cálculo só seja refeito quando `vendas` ou `dinoId` mudarem, evitando processamento desnecessário.

**Por que ordenar?**
Porque gráficos temporais devem ter o eixo X crescente; caso contrário, a linha “quebra” ou anda para trás.

---

## 2. Estrutura de layout

```jsx
<div style={{ width: "100%", maxWidth: 900, margin: "2rem auto" }}>
```

Esse contêiner não faz parte do Recharts.
Ele define:

* largura máxima,
* centralização na tela,
* espaçamento externo.

Serve exclusivamente para posicionamento e estilo.

---

## 3. Fundo do gráfico

```jsx
<div
  style={{
    background: "#f3f4f6",
    padding: "1rem",
    borderRadius: 8,
    height: 380
  }}
>
```

Define:

* área onde o gráfico será renderizado,
* uma cor de fundo,
* bordas arredondadas,
* altura fixa.

A altura é importante porque o `ResponsiveContainer` precisa de uma referência para calcular o espaço.

---

## 4. `<ResponsiveContainer>`

```jsx
<ResponsiveContainer width="100%" height="100%">
```

Responsável por tornar o gráfico fluidamente adaptável ao espaço disponível.

Configurações possíveis:

* `aspect={16/9}` para gráficos com proporção fixa,
* `minHeight` e `minWidth`,
* `width="80%"` para ocupar parte da área.

---

## 5. `<LineChart>`

```jsx
<LineChart data={serie} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
```

Esse é o contêiner principal do próprio Recharts.

Configurações relevantes aqui:

* `data={serie}` é o array que será plotado,
* `margin` define espessuras internas para que eixos e textos não sejam cortados.

Também poderia receber:

* `syncId` para sincronizar vários gráficos,
* `onClick` e eventos de interação,
* `layout="vertical"` para trocar eixos.

---

## 6. `<CartesianGrid>`

```jsx
<CartesianGrid strokeDasharray="3 3" />
```

Desenha uma grade de fundo que facilita a leitura.

Configurações possíveis:

* desligar linhas horizontais ou verticais,
* trocar a cor da grade,
* usar linhas contínuas.

---

## 7. `<XAxis>` – Eixo das datas

```jsx
<XAxis
  dataKey="data"
  tickFormatter={formatDate}
  interval="preserveStartEnd"
  minTickGap={24}
/>
```

Responsabilidades:

* define o eixo X como sendo a propriedade `data`,
* formata a data para `DD/MM`,
* preserva o primeiro e último rótulo,
* evita sobreposição de rótulos com `minTickGap`.

Outras possíveis configurações:

* `angle={-45}` para rótulos inclinados,
* `type="number"` para timestamps,
* `allowDuplicatedCategory={false}`,
* `label` para título do eixo.

---

## 8. `<YAxis>` – Eixo do valor

```jsx
<YAxis tickFormatter={(v) => `${v}`} domain={["auto", "auto"]} />
```

Aqui:

* `tickFormatter` formata os valores,
* `domain=["auto", "auto"]` ajusta dinamicamente o range do eixo Y.

Você poderia:

* obrigar um zero inicial com `domain={[0, "dataMax"]}`,
* adicionar `label` para título,
* remover ticks com `tick={false}`.

---

## 9. `<Tooltip>`

```jsx
<Tooltip
  formatter={(v) => [`${v} Pila`, "Preço"]}
  labelFormatter={(label) => `Data: ${formatDate(label)}`}
/>
```

Permite interação ao passar o mouse pela linha.
Aqui:

* `formatter` define como o valor aparece,
* `labelFormatter` personaliza o texto exibido no cabeçalho do tooltip.

Também pode receber:

* `content` para tooltip totalmente customizado,
* `cursor` para realçar a área sob o mouse.

---

## 10. `<Line>`

```jsx
<Line
  type="monotone"
  dataKey="valor"
  stroke="#4f46e5"
  strokeWidth={2}
  dot={{ r: 3 }}
  activeDot={{ r: 5 }}
  name="Preço"
/>
```

Esse é o elemento que renderiza a linha do gráfico.

Configurações aplicadas:

* `type="monotone"` cria uma curva suave,
* `dataKey="valor"` define o campo da série,
* `stroke` e `strokeWidth` definem a aparência,
* `dot` controla os marcadores dos pontos,
* `activeDot` destaca o ponto selecionado.

Configurações adicionais possíveis:

* `isAnimationActive={false}` para desempenho,
* `connectNulls` para não quebrar a linha em dados faltantes,
* `strokeDasharray` para linha pontilhada,
* cores dinâmicas baseadas no valor.

---

# Resumo Geral

Este componente recebe `vendas` e `dinoId`, prepara uma série temporal e exibe um gráfico simples e direto da evolução do preço daquele dino ao longo das datas registradas.

Ele demonstra:

* como transformar dados antes de enviar ao gráfico,
* como configurar um LineChart básico,
* como funciona cada elemento do Recharts,
* como trabalhar com eixos, tooltips e responsividade.

---

# Possíveis extensões (para estudos)

Para aprofundar:

* adicionar `ReferenceLine` marcando o lançamento,
* adicionar média móvel de preço,
* trocar o tipo da curva para `linear`,
* permitir múltiplas linhas no mesmo gráfico,
* adicionar zoom com `<Brush>`.

