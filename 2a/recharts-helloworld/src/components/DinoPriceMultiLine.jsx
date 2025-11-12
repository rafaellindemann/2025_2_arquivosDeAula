import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts"

// Função para formatar datas (YYYY-MM-DD → DD/MM)
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`
}

export default function DinoPriceMultiLine({ dinos, vendas }) {
  // 1. Extrai todas as datas únicas (ordenadas)
  const datas = [...new Set(vendas.map(v => v.data))].sort()

  // 2. Monta estrutura no formato:
  // [{ data: "2025-10-01", Rex: 920, Spino: 940, ... }, ...]
  const dataMerged = datas.map(data => {
    const entry = { data }
    dinos.forEach(d => {
      const venda = vendas.find(v => v.data === data && v.dino_id === d.id)
      entry[d.nome] = venda ? venda.valor : null
    })
    return entry
  })

  // 3. Cores diferentes para cada linha
  const cores = [
    "#4f46e5", "#16a34a", "#dc2626", "#ca8a04", "#0891b2",
    "#9333ea", "#e11d48", "#2563eb", "#f97316", "#0d9488"
  ]

  return (
    <div style={{ width: "100%", maxWidth: 950, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Evolução de preço por espécie (em Pila)
      </h2>

      <div style={{ background: "#f3f4f6", padding: "1rem", borderRadius: 8, height: 450 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataMerged}
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="data"
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              minTickGap={25}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              formatter={(v, name) => [`${v ?? "-"} Pila`, name]}
              labelFormatter={(label) => `Data: ${formatDate(label)}`}
            />
            <Legend verticalAlign="top" height={40} />

            {dinos.map((d, i) => (
              <Line
                key={d.id}
                type="monotone"
                dataKey={d.nome}
                stroke={cores[i % cores.length]}
                strokeWidth={2}
                dot={false}
                name={d.nome}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
