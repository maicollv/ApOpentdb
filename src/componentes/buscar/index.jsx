import { useState } from 'react';
import './style.css';

function Buscar() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (busqueda.length < 3) return;

    try {
      const res = await fetch('https://opentdb.com/api.php?amount=5000');
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
          <li key={index} dangerouslySetInnerHTML={{ __html: pregunta.question }}></li>
        ))}
      </ul>
    </div>
  );
}

export default Buscar;
