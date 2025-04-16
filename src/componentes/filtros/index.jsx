import { useState, useEffect } from 'react';
import './style.css';

function Filtro({ onCategoriaChange }) {
  const [categorias, setCategorias] = useState([]);
  
  useEffect(() => {
    // Obtener las categorías de preguntas al cargar el componente
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        if (data.trivia_categories) {
          setCategorias(data.trivia_categories);
        }
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="c-filtro">
      <button onClick={() => onCategoriaChange('')}>Todas</button>
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onCategoriaChange(categoria.id)}
        >
          {categoria.name}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
