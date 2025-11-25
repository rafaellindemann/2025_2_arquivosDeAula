import { useState } from 'react'

import './App.css'
import DinoBarChart from './components/DinoBarChart'
import DinoPriceTimeline from './components/DinoPriceTimeline'
import DinoPriceMultiLine from './components/DinoPriceMultiLine'

function App() {
  const dinos = [
  { id: 1,  nome: "Rex",         vida: 300, estamina: 240, peso: 260, dano: 290, comida: 180, oxigenio:  90, nivel: 1361, valor: 920 },
  { id: 2,  nome: "Argentavis",  vida: 220, estamina: 300, peso: 240, dano: 160, comida: 200, oxigenio: 140, nivel: 1261, valor: 700 },
  { id: 3,  nome: "Ankylo",      vida: 210, estamina: 180, peso: 300, dano: 150, comida: 220, oxigenio:  60, nivel: 1121, valor: 520 },
  { id: 4,  nome: "Doedicurus",  vida: 200, estamina: 170, peso: 310, dano: 140, comida: 210, oxigenio:  50, nivel: 1081, valor: 480 },
  { id: 5,  nome: "Therizino",   vida: 280, estamina: 260, peso: 240, dano: 300, comida: 190, oxigenio: 100, nivel: 1371, valor: 930 },
  { id: 6,  nome: "Trike",       vida: 190, estamina: 160, peso: 220, dano: 170, comida: 200, oxigenio:  80, nivel: 1021, valor: 350 },
  { id: 7,  nome: "Spino",       vida: 290, estamina: 250, peso: 230, dano: 310, comida: 170, oxigenio: 110, nivel: 1361, valor: 910 },
  { id: 8,  nome: "Raptor",      vida: 120, estamina: 200, peso: 140, dano: 220, comida: 160, oxigenio: 120, nivel:  961, valor: 240 },
  { id: 9,  nome: "Stego",       vida: 230, estamina: 170, peso: 290, dano: 180, comida: 210, oxigenio:  70, nivel: 1151, valor: 500 },
  { id: 10, nome: "Giga",        vida: 320, estamina: 120, peso: 280, dano: 320, comida: 160, oxigenio:  70, nivel: 1271, valor: 980 }
]

const vendas = [
  // Rex (id 1) — hype e queda suave
  { id: 1,  dino_id: 1, data: "2025-10-01", valor: 920 },
  { id: 2,  dino_id: 1, data: "2025-10-04", valor: 885 },
  { id: 3,  dino_id: 1, data: "2025-10-07", valor: 850 },
  { id: 4,  dino_id: 1, data: "2025-10-10", valor: 820 },
  { id: 5,  dino_id: 1, data: "2025-10-14", valor: 800 },
  { id: 6,  dino_id: 1, data: "2025-10-18", valor: 790 },
  { id: 7,  dino_id: 1, data: "2025-10-25", valor: 780 },
  { id: 8,  dino_id: 1, data: "2025-11-01", valor: 775 },

  // Therizino (id 5)
  { id: 9,  dino_id: 5, data: "2025-10-01", valor: 950 },
  { id: 10, dino_id: 5, data: "2025-10-04", valor: 905 },
  { id: 11, dino_id: 5, data: "2025-10-07", valor: 870 },
  { id: 12, dino_id: 5, data: "2025-10-10", valor: 840 },
  { id: 13, dino_id: 5, data: "2025-10-14", valor: 825 },
  { id: 14, dino_id: 5, data: "2025-10-18", valor: 815 },
  { id: 15, dino_id: 5, data: "2025-10-25", valor: 810 },
  { id: 16, dino_id: 5, data: "2025-11-01", valor: 805 },

  // Spino (id 7)
  { id: 17, dino_id: 7, data: "2025-10-01", valor: 940 },
  { id: 18, dino_id: 7, data: "2025-10-05", valor: 890 },
  { id: 19, dino_id: 7, data: "2025-10-09", valor: 855 },
  { id: 20, dino_id: 7, data: "2025-10-13", valor: 830 },
  { id: 21, dino_id: 7, data: "2025-10-17", valor: 815 },
  { id: 22, dino_id: 7, data: "2025-10-22", valor: 808 },
  { id: 23, dino_id: 7, data: "2025-10-28", valor: 802 },
  { id: 24, dino_id: 7, data: "2025-11-03", valor: 800 },

  // Giga (id 10) — hype forte e estabilização
  { id: 25, dino_id: 10, data: "2025-10-02", valor: 990 },
  { id: 26, dino_id: 10, data: "2025-10-06", valor: 970 },
  { id: 27, dino_id: 10, data: "2025-10-11", valor: 940 },
  { id: 28, dino_id: 10, data: "2025-10-15", valor: 905 },
  { id: 29, dino_id: 10, data: "2025-10-20", valor: 885 },
  { id: 30, dino_id: 10, data: "2025-10-26", valor: 865 },
  { id: 31, dino_id: 10, data: "2025-11-01", valor: 852 },
  { id: 32, dino_id: 10, data: "2025-11-08", valor: 845 },

  // Argentavis (id 2) — queda leve
  { id: 33, dino_id: 2, data: "2025-10-02", valor: 720 },
  { id: 34, dino_id: 2, data: "2025-10-15", valor: 700 },
  { id: 35, dino_id: 2, data: "2025-11-02", valor: 680 },

  // Ankylo (id 3)
  { id: 36, dino_id: 3, data: "2025-10-03", valor: 520 },
  { id: 37, dino_id: 3, data: "2025-10-19", valor: 500 },
  { id: 38, dino_id: 3, data: "2025-11-03", valor: 490 },

  // Doedicurus (id 4)
  { id: 39, dino_id: 4, data: "2025-10-05", valor: 480 },
  { id: 40, dino_id: 4, data: "2025-10-21", valor: 465 },
  { id: 41, dino_id: 4, data: "2025-11-04", valor: 455 },

  // Trike (id 6)
  { id: 42, dino_id: 6, data: "2025-10-06", valor: 360 },
  { id: 43, dino_id: 6, data: "2025-10-24", valor: 350 },
  { id: 44, dino_id: 6, data: "2025-11-05", valor: 345 },

  // Raptor (id 8)
  { id: 45, dino_id: 8, data: "2025-10-08", valor: 260 },
  { id: 46, dino_id: 8, data: "2025-10-23", valor: 245 },
  { id: 47, dino_id: 8, data: "2025-11-06", valor: 235 },

  // Stego (id 9)
  { id: 48, dino_id: 9, data: "2025-10-09", valor: 510 },
  { id: 49, dino_id: 9, data: "2025-10-27", valor: 500 },
  { id: 50, dino_id: 9, data: "2025-11-07", valor: 495 }
]


  return (
    <>
      <h1 style={{backgroundColor: "#222325ff", color: "white", padding: "1rem", textAlign: "center"}}>Recharts: o Hello World</h1>
      
      <DinoBarChart dinos={dinos} />
      <DinoPriceTimeline dinoId={1} vendas={vendas} />
      <DinoPriceMultiLine dinos={dinos} vendas={vendas} />
    </>
  )
}

export default App
