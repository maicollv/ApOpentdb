import { useState, useContext } from 'react';
import './style.css';
import { useAppContext } from "../../contexto/contexto";

function Buscar() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const { favoritos, setFavoritos } = useAppContext();

  const handleBuscar = async () => {
    if (busqueda.length < 3) return;

    try {
      const res = await fetch('https://opentdb.com/api.php?amount=50');
      const data = await res.json();
      if (data.results) {
        const filtrados = data.results.filter(p =>
          p.question.toLowerCase().includes(busqueda.toLowerCase())
        );
        setResultados(filtrados);
      }
    } catch (error) {
      console.error('Error al buscar:', error);
      setResultados([]);
    }
  };

  const toggleFavorito = (pregunta) => {
    const existe = favoritos.some(fav => fav.question === pregunta.question);
    if (existe) {
      setFavoritos(favoritos.filter(fav => fav.question !== pregunta.question));
    } else {
      setFavoritos([...favoritos, pregunta]);
    }
  };

  const esFavorito = (pregunta) => {
    return favoritos.some(fav => fav.question === pregunta.question);
  };

  return (
    <div className="c-buscar">
      <h2>Buscar preguntas</h2>
      <input
        type="text"
        placeholder="Buscar por texto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
      />
      <button onClick={handleBuscar}>Buscar</button>

      <ul>
        {resultados.map((pregunta, index) => (
          <li key={index}>
            <span dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <button
              onClick={() => toggleFavorito(pregunta)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
              title={esFavorito(pregunta) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {esFavorito(pregunta) ? '⭐' : '☆'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buscar;
