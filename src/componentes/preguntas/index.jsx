import { useState, useEffect } from 'react';
import './style.css';

function Preguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [token, setToken] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_token.php?command=request');
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.error('Error al obtener token:', error);
      }
    };

    obtenerToken();
  }, []);

  const cargarPreguntas = async () => {
    if (!token) return;

    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&token=${token}`);
      const data = await res.json();
      if (data && data.results) {
        setPreguntas(prev => [...prev, ...data.results]); // Acumula las preguntas
        setPagina(p => p + 1);
      }
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
    }
  };

  useEffect(() => {
    if (token) cargarPreguntas(); // Carga las primeras 20 automáticamente
  }, [token]);

  return (
    <div className="c-preguntas">
      <h2>Preguntas</h2>
      <ol>
        {preguntas.map((pregunta, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: pregunta.question }}></li>
        ))}
      </ol>

      <button onClick={cargarPreguntas} className="c-boton">
        Cargar más preguntas
      </button>
    </div>
  );
}

export default Preguntas;
