import { useState, useEffect } from 'react';
import './style.css';

const coloresClaro = ['#e91e63', '#9c27b0', '#2196f3', '#4caf50', '#ff9800', '#795548'];
const coloresOscuro = ['#ff80ab', '#ce93d8', '#90caf9', '#a5d6a7', '#ffcc80', '#a1887f'];

function Filtro({ onCategoriaChange }) {
  const [categorias, setCategorias] = useState([]);

  // Detectar si estamos en tema oscuro
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // Elegir colores según tema
  const colores = isDark ? coloresOscuro : coloresClaro;

  // Para guardar el color hover de cada botón, usaremos un estado local de objetos
  const [hoverColors, setHoverColors] = useState({});

  useEffect(() => {
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

  const handleMouseEnter = (id) => {
    const color = colores[Math.floor(Math.random() * colores.length)];
    setHoverColors((prev) => ({ ...prev, [id]: color }));
  };

  const handleMouseLeave = (id) => {
    setHoverColors((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="c-filtro">
      <button
        onClick={() => onCategoriaChange('')}
        onMouseEnter={() => handleMouseEnter('todas')}
        onMouseLeave={() => handleMouseLeave('todas')}
        style={{ color: hoverColors['todas'] || '' }}
      >
        Todas
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onCategoriaChange(categoria.id)}
          onMouseEnter={() => handleMouseEnter(categoria.id)}
          onMouseLeave={() => handleMouseLeave(categoria.id)}
          style={{ color: hoverColors[categoria.id] || '' }}
        >
          {categoria.name}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
