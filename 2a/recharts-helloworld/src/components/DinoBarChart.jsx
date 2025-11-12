import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DinoBarChart({dinos}) {
  return (
    <div style={{ width: '50%', height: 400, backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem", margin: "2rem auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"  }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Valor dos Dinos (em Pila)</h2>
      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={dinos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="nome" /> */}
            {/* <XAxis dataKey="nome" interval={0} angle={-90} textAnchor="end" height={100} /> */}
            <XAxis dataKey="nome" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} Pila`} />
          <Bar dataKey="valor" fill="#4f46e5" barSize={40} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
