import { useMemo, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts"

// util simples para formatar ISO YYYY-MM-DD -> DD/MM
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number)
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`
}

export default function DinoPriceTimelineSelect({ dinos, vendas }) {
  const [dinoId, setDinoId] = useState(dinos?.[0]?.id ?? 1)

  // série temporal do dino selecionado, ordenada por data
  const serie = useMemo(() => {
    return vendas
      .filter(v => v.dino_id == dinoId)
      .sort((a, b) => a.data.localeCompare(b.data))
      .map(v => ({ data: v.data, valor: v.valor }))
  }, [vendas, dinoId])

  const dinoAtual = useMemo(
    () => dinos.find(d => d.id == dinoId)?.nome ?? "Dino",
    [dinos, dinoId]
  )

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "2rem auto" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Evolução de preço — {dinoAtual}</h2>

        <label style={{ marginLeft: "auto" }}>
          Espécie:{" "}
          <select value={dinoId} onChange={(e) => setDinoId(Number(e.target.value))}>
            {dinos.map(d => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ background: "#f3f4f6", padding: "1rem", borderRadius: 8, height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={serie} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="data"
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              tickFormatter={(v) => `${v}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(v) => [`${v} Pila`, "Preço"]}
              labelFormatter={(label) => `Data: ${formatDate(label)}`}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Preço"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
