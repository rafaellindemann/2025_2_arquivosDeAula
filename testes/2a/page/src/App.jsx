import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Corpo from './components/Corpo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <NavBar />
      <Corpo />
    </div>
  )
}

export default App
