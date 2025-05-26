// src/components/Preguntas.jsx
import { useState, useEffect, useContext } from 'react';
import { useAppContext } from "../../contexto/contexto";
import './style.css';

function Preguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [token, setToken] = useState('');
  const [pagina, setPagina] = useState(1);
  const { favoritos, setFavoritos } = useAppContext();


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
        setPreguntas(prev => [...prev, ...data.results]);
        setPagina(p => p + 1);
      }
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
    }
  };

  useEffect(() => {
    if (token) cargarPreguntas();
  }, [token]);

  const toggleFavorito = (pregunta) => {
    const esFavorito = favoritos.some(p => p.question === pregunta.question);
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.question !== pregunta.question));
    } else {
      setFavoritos([...favoritos, pregunta]);
    }
  };

  const esFavorito = (pregunta) => {
    return favoritos.some(p => p.question === pregunta.question);
  };

  return (
    <div className="c-preguntas">
      <h2>Preguntas</h2>
      <ol>
        {preguntas.map((pregunta, index) => (
          <li key={index}>
            <span dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <button onClick={() => toggleFavorito(pregunta)}>
              {esFavorito(pregunta) ? '⭐' : '☆'}
            </button>
          </li>
        ))}
      </ol>

      <button onClick={cargarPreguntas} className="c-boton">
        Cargar más preguntas
      </button>
    </div>
  );
}

export default Preguntas;
