import { useState, useEffect } from 'react';
import { useAppContext } from "../../contexto/contexto";
import { supabase } from '../../supabase';
import './style.css';

function Preguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [token, setToken] = useState('');
  const [pagina, setPagina] = useState(1);
  const { favoritos, setFavoritos, user } = useAppContext();

  // Obtener token una sola vez al cargar
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

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession()
      .then(({ data }) => {
        if (data.session) {
          setUsuario(data.session.user);
        }
      });
  }, []);

  const cargarPreguntas = async () => {
    if (!token) return;
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&token=${token}`);
      
      if (res.status === 429) {
        console.warn('Demasiadas solicitudes. Reintentando en 5 segundos...');
        setTimeout(cargarPreguntas, 5000); // espera 5 segundos y reintenta
        return;
      }

      const data = await res.json();
      if (data?.results) {
        setPreguntas(prev => [...prev, ...data.results]);
        setPagina(p => p + 1);
      } else {
        console.error('No se recibieron preguntas válidas:', data);
      }
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
    }
  };

  useEffect(() => {
    if (token) cargarPreguntas();
  }, [token]);

  const toggleFavorito = async (pregunta) => {
  if (!pregunta || !usuario || !usuario.id) {
    console.error("Pregunta o usuario inválido:", pregunta, usuario);
    return;
  }

  // Buscar si ya está en favoritos
  const { data: existentes, error: errorBuscar } = await supabase
    .from("favoritos")
    .select("*")
    .eq("pregunta", pregunta.question)
    .eq("usuarioid", usuario.id);

  if (errorBuscar) {
    console.error("Error al buscar favoritos:", errorBuscar);
    return;
  }

  if (existentes.length > 0) {
    // Ya existe, eliminar favorito
    const { error: errorEliminar } = await supabase
      .from("favoritos")
      .delete()
      .eq("id", existentes[0].id);

    if (errorEliminar) {
      console.error("Error al eliminar favorito:", errorEliminar);
    } else {
      console.log("Favorito eliminado");
      // Actualiza estado local quitando el favorito
      setFavoritos((prev) =>
        prev.filter((f) => f.id !== existentes[0].id)
      );
    }
  } else {
    // No existe, insertar favorito
    const { data: dataInsertada, error: errorInsertar } = await supabase
      .from("favoritos")
      .insert([{
        pregunta: pregunta.question,
        correcta: pregunta.correct_answer,
        categoria: pregunta.category,
        dificultad: pregunta.difficulty,
        incorrecta: pregunta.incorrect_answers,
        usuarioid: usuario.id,
      }])
      .select();  // select() para obtener el registro insertado

    if (errorInsertar) {
      console.error("Error al insertar favorito:", errorInsertar);
    } else {
      console.log("Favorito agregado");
      // Actualiza estado local agregando el nuevo favorito
      setFavoritos((prev) => [...prev, dataInsertada[0]]);
    }
  }
};

  const esFavorito = (pregunta) => {
  return favoritos.some(fav => fav.pregunta === pregunta.question);
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
