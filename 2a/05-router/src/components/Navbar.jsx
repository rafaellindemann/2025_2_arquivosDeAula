import { Link } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
  return (
    <nav className='navbar'>
        <Link to="/">Home Page</Link>
        <Link to="/pagina1">pg1</Link>
        <Link to="/pagina2">pgII</Link>
        <Link to="/pagina3">pg Três</Link>
    </nav>
  )
}

export default Navbar