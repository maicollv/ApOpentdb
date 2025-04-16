import { useState, useEffect } from 'react';
import './style.css';
import Filtro from '../filtros';

function Categorias() {
  const [preguntas, setPreguntas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      setCargando(true);
      try {
        // Si no hay categoría seleccionada, traemos todas las preguntas
        const url = `https://opentdb.com/api.php?amount=20${categoriaSeleccionada ? `&category=${categoriaSeleccionada}` : ''}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results) {
          setPreguntas(data.results);
        }
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPreguntas();
  }, [categoriaSeleccionada]); // Este efecto se ejecuta cuando cambia la categoría seleccionada

  return (
    <div>
      <h1>Categorias de Trivia</h1>

      {/* Filtro de categorías */}
      <Filtro onCategoriaChange={setCategoriaSeleccionada} />

      {cargando && <p>Cargando preguntas...</p>}

      {/* Mostrar las preguntas */}
      <ul>
        {preguntas.length === 0 && !cargando && (
          <p>No hay preguntas disponibles para esta categoría.</p>
        )}

        {preguntas.map((pregunta, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: pregunta.question }} />
        ))}
      </ul>
    </div>
  );
}

export default Categorias;

