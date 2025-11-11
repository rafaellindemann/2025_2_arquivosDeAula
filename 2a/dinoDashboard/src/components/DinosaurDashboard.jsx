import React, { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Search, Filter, Leaf, Bone, Globe2, Clock3, Ruler, Scale, X } from "lucide-react";
import "./DinosaurDashboard.css";

/**
 * Dinosaur Museum Dashboard – Single-file React component (React + Vite)
 * Versão com CSS Vanilla (arquivo DinosaurDashboard.css)
 * --------------------------------------------------------------------
 * - Mock de ~320 dinossauros
 * - Filtros (período, dieta, região, comprimento, busca)
 * - KPIs, gráficos (recharts) e tabela paginada
 * - Sem Tailwind; utiliza utilitários definidos no CSS vanilla
 */

// ---------- helpers ----------
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

const PERIODS = [
  { key: "Triássico", startMYA: 252, endMYA: 201 },
  { key: "Jurássico", startMYA: 201, endMYA: 145 },
  { key: "Cretáceo", startMYA: 145, endMYA: 66 },
];

const DIETS = ["Herbívoro", "Carnívoro", "Onívoro"];
const REGIONS = [
  "América do Sul",
  "América do Norte",
  "Europa",
  "África",
  "Ásia",
  "Oceania",
  "Antártica",
];

const BASE_NAMES = [
  "Tyranno", "Veloci", "Tricera", "Ankylo", "Brachio", "Stego", "Spino",
  "Allo", "Giga", "Carno", "Pachy", "Igua", "Para", "Austro", "Cryo",
  "Dilo", "Deino", "Megalo", "Sucho", "Ourano", "Maiasaura", "Corytho",
  "Edmonto", "Gallimimus", "Therizo", "Cerato", "Toro", "Utah", "Troodon",
  "Compsognathus", "Microraptor", "Oviraptor", "Quetzal", "Diplodocus",
  "Apatosaurus", "Camarasaurus", "Iguanodon", "Hadrosaurus", "Carnotaurus",
  "Tarbosaurus", "Albertosaurus", "Euoplocephalus", "Nothronychus",
  "Mononykus", "Mamenchisaurus", "Huayangosaurus", "Kentrosaurus",
];

function randomFrom(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }
function titleCase(x) { return x.replace(/(^|\s)([a-zãéíóúàç])/gi, (m, sp, c) => sp + c.toUpperCase()); }

function generateDinosaurs(count = 320, seed = 42) {
  const rnd = seededRandom(seed);
  const dinos = [];
  for (let i = 0; i < count; i++) {
    const base = randomFrom(BASE_NAMES, rnd);
    const suffixes = ["saurus", "raptor", "dromeus", "ceratops", "venator", "mimus", "don", "gnathus"];
    const name = titleCase(base + suffixes[Math.floor(rnd() * suffixes.length)] + (rnd() > 0.88 ? ` ${Math.floor(rnd() * 3) + 1}` : ""));

    const period = randomFrom(PERIODS, rnd);
    const diet = rnd() < 0.5 ? "Herbívoro" : rnd() < 0.8 ? "Carnívoro" : "Onívoro";
    const region = randomFrom(REGIONS, rnd);

    const length = +(2 + rnd() * 28).toFixed(1); // 2m a 30m
    const mass = Math.round(Math.pow(length, 3) * (rnd() * 40 + 10));
    const discoveryYear = 1820 + Math.floor(rnd() * 205);
    const mya = +(period.endMYA + rnd() * (period.startMYA - period.endMYA)).toFixed(1);

    dinos.push({ id: i + 1, name, period: period.key, diet, region, length, mass, discoveryYear, mya });
  }
  return dinos;
}

const fmt = new Intl.NumberFormat("pt-BR");

export default function DinosaurDashboard() {
  const [seed, setSeed] = useState(42);
  const [data] = useState(() => generateDinosaurs(320, seed));

  // Filtros
  const [query, setQuery] = useState("");
  const [periods, setPeriods] = useState(new Set(PERIODS.map((p) => p.key)));
  const [diets, setDiets] = useState(new Set(DIETS));
  const [region, setRegion] = useState("Todas");
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(30);

  // Tabela / paginação
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Dados filtrados
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((d) => {
      if (!periods.has(d.period)) return false;
      if (!diets.has(d.diet)) return false;
      if (region !== "Todas" && d.region !== region) return false;
      if (d.length < minLength || d.length > maxLength) return false;
      if (q && !d.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, query, periods, diets, region, minLength, maxLength]);

  // KPIs
  const kpis = useMemo(() => {
    const total = filtered.length;
    const byPeriod = Object.fromEntries(PERIODS.map((p) => [p.key, 0]));
    const byDiet = Object.fromEntries(DIETS.map((d) => [d, 0]));
    let avgLength = 0; let avgMass = 0;

    filtered.forEach((d) => { byPeriod[d.period]++; byDiet[d.diet]++; avgLength += d.length; avgMass += d.mass; });

    if (total > 0) { avgLength = +(avgLength / total).toFixed(1); avgMass = Math.round(avgMass / total); }

    const now = new Date().getFullYear();
    const decades = [now - 40, now - 30, now - 20, now - 10, now];
    const discoveries = decades.map((endY) => {
      const startY = endY - 9;
      const count = filtered.filter((d) => d.discoveryYear >= startY && d.discoveryYear <= endY).length;
      return { label: `${startY}-${endY}`, count };
    });

    const topLength = [...filtered].sort((a, b) => b.length - a.length)[0];

    return { total, byPeriod, byDiet, avgLength, avgMass, discoveries, topLength };
  }, [filtered]);

  // Chart data
  const chartByPeriod = useMemo(() => Object.entries(kpis.byPeriod || {}).map(([period, count]) => ({ period, count })), [kpis.byPeriod]);
  const chartByDiet = useMemo(() => Object.entries(kpis.byDiet || {}).map(([diet, count]) => ({ name: diet, value: count })), [kpis.byDiet]);
  const chartDiscoveries = useMemo(() => kpis.discoveries || [], [kpis.discoveries]);
  const chartScatter = useMemo(() => filtered.map((d) => ({ x: d.length, y: d.mass, z: d.mya, diet: d.diet, name: d.name })), [filtered]);

  // Tabela paginada
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

  const COLORS = ["#60a5fa", "#f97316", "#22c55e", "#a78bfa", "#f43f5e", "#14b8a6", "#eab308"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container py-8">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl text-3xl font-bold tracking-tight">🏛️ Museu Paleológico – Dashboard de Dinossauros</h1>
            <p className="muted">Demonstração educacional: filtros, KPIs, gráficos e tabela com dados mockados (≈320 registros).</p>
          </div>
          <button className="btn" onClick={() => { setSeed((s) => s + 1); window.location.reload(); }} title="Regenerar dados">
            <Bone className="w-4 h-4" /> Regenerar dataset
          </button>
        </header>

        {/* Filtros */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm muted">Busca por nome</label>
              <div className="relative mt-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 muted" />
                <input className="input pl-9" placeholder="ex.: Triceratops" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm muted">Região</label>
              <select className="select mt-1" value={region} onChange={(e) => setRegion(e.target.value)}>
                <option>Todas</option>
                {REGIONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm muted">Comprimento mínimo (m)</label>
              <input type="range" min={0} max={30} step={1} className="range mt-2" value={minLength} onChange={(e) => setMinLength(+e.target.value)} />
              <div className="text-xs mt-1">≥ {minLength} m</div>
            </div>
            <div>
              <label className="text-sm muted">Comprimento máximo (m)</label>
              <input type="range" min={0} max={30} step={1} className="range mt-2" value={maxLength} onChange={(e) => setMaxLength(+e.target.value)} />
              <div className="text-xs mt-1">≤ {maxLength} m</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-sm muted mb-2">Períodos</div>
              <div className="flex flex-wrap gap-2">
                {PERIODS.map((p) => (
                  <button
                    key={p.key}
                    className={`badge ${periods.has(p.key) ? "border-blue-500" : "opacity-50"}`}
                    onClick={() => setPeriods((prev) => { const n = new Set(prev); n.has(p.key) ? n.delete(p.key) : n.add(p.key); return n; })}
                  >
                    {p.key}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm muted mb-2">Dieta</div>
              <div className="flex flex-wrap gap-2">
                {DIETS.map((d) => (
                  <button
                    key={d}
                    className={`badge ${diets.has(d) ? "border-green-500" : "opacity-50"}`}
                    onClick={() => setDiets((prev) => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n; })}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(query || region !== "Todas" || periods.size !== PERIODS.length || diets.size !== DIETS.length || minLength > 0 || maxLength < 30) && (
              <button className="btn" onClick={() => { setQuery(""); setRegion("Todas"); setPeriods(new Set(PERIODS.map((p) => p.key))); setDiets(new Set(DIETS)); setMinLength(0); setMaxLength(30); }}>
                <X className="w-4 h-4" /> Limpar filtros
              </button>
            )}
            <span className="text-sm muted">
              Resultados: <strong>{filtered.length}</strong> de {data.length}
            </span>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card kpi">
            <div>
              <div className="muted text-xs">Espécies filtradas</div>
              <div className="text-2xl font-bold">{fmt.format(kpis.total)}</div>
            </div>
            <Globe2 className="w-8 h-8" />
          </div>
          <div className="card kpi">
            <div>
              <div className="muted text-xs">Comprimento médio</div>
              <div className="text-2xl font-bold">{kpis.avgLength || 0} m</div>
            </div>
            <Ruler className="w-8 h-8" />
          </div>
          <div className="card kpi">
            <div>
              <div className="muted text-xs">Massa média</div>
              <div className="text-2xl font-bold">{fmt.format(kpis.avgMass || 0)} kg</div>
            </div>
            <Scale className="w-8 h-8" />
          </div>
          <div className="card kpi">
            <div>
              <div className="muted text-xs">Maior espécime (filtrado)</div>
              <div className="text-2xl font-bold">{kpis.topLength ? `${kpis.topLength.name}` : "—"}</div>
              <div className="text-xs muted">{kpis.topLength ? `${kpis.topLength.length} m · ${fmt.format(kpis.topLength.mass)} kg` : ""}</div>
            </div>
            <Leaf className="w-8 h-8" />
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <h3 className="font-semibold mb-2">Distribuição por Período</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={chartByPeriod} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="period" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Dieta</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartByDiet} dataKey="value" nameKey="name" outerRadius={90} label>
                    {chartByDiet.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Descobertas por Década</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={chartDiscoveries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }} />
                  <Line type="monotone" dataKey="count" stroke="#60a5fa" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="card mb-6">
          <h3 className="font-semibold mb-2">Tamanho × Massa (cor: dieta, bolha: milhões de anos)</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" dataKey="x" name="Comprimento" unit=" m" stroke="#94a3b8" domain={[0, 32]} />
                <YAxis type="number" dataKey="y" name="Massa" unit=" kg" stroke="#94a3b8" />
                <ZAxis type="number" dataKey="z" range={[30, 200]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }}
                  formatter={(value, name) => {
                    if (name === "x") return [value + " m", "Comprimento"];
                    if (name === "y") return [fmt.format(value) + " kg", "Massa"];
                    if (name === "z") return [value + " MYA", "Idade (milhões de anos)"];
                    return [value, name];
                  }}
                  labelFormatter={(label, payload) => (payload && payload[0] ? payload[0].payload.name : "")}
                />
                {DIETS.map((d, idx) => (
                  <Scatter key={d} name={d} data={chartScatter.filter((p) => p.diet === d)} fill={COLORS[idx % COLORS.length]} />
                ))}
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Tabela */}
        <section className="card">
          <div className="flex items-center gap-2 mb-3">
            <Clock3 className="w-4 h-4" />
            <h3 className="font-semibold">Acervo (paginação)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table text-sm">
              <thead className="muted">
                <tr>
                  <th>Nome</th>
                  <th>Período</th>
                  <th>Dieta</th>
                  <th>Região</th>
                  <th>Comprimento</th>
                  <th>Massa</th>
                  <th>Descoberto</th>
                  <th>Idade (MYA)</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((d) => (
                  <tr key={d.id}>
                    <td className="font-medium">{d.name}</td>
                    <td>{d.period}</td>
                    <td>{d.diet}</td>
                    <td>{d.region}</td>
                    <td>{d.length} m</td>
                    <td>{fmt.format(d.mass)} kg</td>
                    <td>{d.discoveryYear}</td>
                    <td>{d.mya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="muted text-xs">Mostrando {pageData.length} de {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button className="btn" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>
              <span className="text-sm">Página {page} / {totalPages}</span>
              <button className="btn" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Próxima</button>
            </div>
          </div>
        </section>

        <footer className="mt-6 text-center text-xs muted">Dashboard fictício para fins didáticos. Dados aleatórios gerados localmente.</footer>
      </div>
    </div>
  );
}
