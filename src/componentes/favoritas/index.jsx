// favoritas/Favoritas.jsx
import { useAppContext } from '../../contexto/contexto';
import './style.css';

function Favoritas() {
  const { favoritos } = useAppContext();

  function mezclarRespuestas(pregunta) {
    const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];
    return respuestas.sort(() => Math.random() - 0.5);
  }

  if (favoritos.length === 0) {
    return <p>No hay preguntas favoritas aún.</p>;
  }

  return (
    <div className="c-favoritas">
      <h2>Preguntas favoritas</h2>
      <ol>
        {favoritos.map((pregunta, index) => (
          <li key={index}>
            <p dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <p><strong>Categoría:</strong> {pregunta.category}</p>
            <p><strong>Dificultad:</strong> {pregunta.difficulty}</p>
            <p><strong>Respuestas posibles:</strong></p>
            <ul>
             {mezclarRespuestas(pregunta).map((respuesta, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: respuesta }}
                  style={{
                    fontWeight: respuesta === pregunta.correct_answer ? 'bold' : 'normal',
                    color: respuesta === pregunta.correct_answer ? 'green' : 'red',
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

export default Favoritas;
