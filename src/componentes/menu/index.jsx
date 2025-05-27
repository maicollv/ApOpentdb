import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Inicio</Link>
          <Link to="/preguntas">Preguntas</Link>
          <Link to="/buscar">Buscar</Link>
          <Link to="/categorias">Categorias</Link>
          <Link to="/favoritas">Favoritas</Link>
          <Link to="/original">Original</Link>
          <Link to="/configuracion">Configuracion</Link>
        </nav>
    )
  }
 
  export default Menu