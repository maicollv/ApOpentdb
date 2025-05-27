import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import './style.css';

export default function Favoritas() {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  // Obtener usuario autenticado y datos completos
  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('usuario')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) {
          setUsuario(data);
          fetchFavoritos(data.id);
        }
      }
    }
    fetchUsuario();
  }, []);

  // Cargar preguntas favoritas del usuario
  const fetchFavoritos = async (usuarioid) => {
    if (!usuarioid) return;
    const { data, error } = await supabase
      .from('favoritos')
      .select('*')
      .eq('usuarioid', usuarioid);

    if (error) {
      console.error('Error al cargar favoritos:', error.message);
    } else {
      setFavoritos(data || []);
    }
  };

  // Mezcla respuestas (correcta e incorrectas)
  const mezclarRespuestas = (pregunta) => {
    const respuestas = [...(pregunta.incorrecta || []), pregunta.correcta];
    return respuestas.sort(() => Math.random() - 0.5);
  };

  if (!usuario) return <p>Cargando usuario...</p>;

  if (favoritos.length === 0) {
    return <p>No hay preguntas favoritas aún.</p>;
  }

  return (
    <div className="c-favoritas">
      <h2>Preguntas favoritas</h2>
      <ol>
        {favoritos.map((pregunta, index) => (
          <li key={index}>
            <p dangerouslySetInnerHTML={{ __html: pregunta.pregunta }} />
            <p><strong>Categoría:</strong> {pregunta.categoria}</p>
            <p><strong>Dificultad:</strong> {pregunta.dificultad}</p>
            <p><strong>Respuestas posibles:</strong></p>
            <ul>
              {mezclarRespuestas(pregunta).map((respuesta, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: respuesta }}
                  style={{
                    fontWeight: respuesta === pregunta.correcta ? 'bold' : 'normal',
                    color: respuesta === pregunta.correcta ? 'green' : 'red',
                  }}
                />
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
