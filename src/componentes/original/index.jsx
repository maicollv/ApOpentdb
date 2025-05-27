import { useEffect, useState } from 'react';
import './style.css';

function Original() {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [tiempo, setTiempo] = useState(30);
  const [jugando, setJugando] = useState(false);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    if (jugando && tiempo > 0) {
      const timer = setTimeout(() => setTiempo(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (jugando && tiempo === 0) {
      setJugando(false);
      setTerminado(true);
    }
  }, [jugando, tiempo]);

  const iniciarJuego = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=20&type=multiple');
    const data = await res.json();
    if (data.results) {
      setPreguntas(data.results);
      setIndice(0);
      setPuntaje(0);
      setTiempo(30);
      setJugando(true);
      setTerminado(false);
    }
  };

  const manejarRespuesta = (respuesta) => {
    if (respuesta === preguntas[indice].correct_answer) {
      setPuntaje(p => p + 1);
    }
    if (indice < preguntas.length - 1) {
      setIndice(i => i + 1);
    } else {
      setJugando(false);
      setTerminado(true);
    }
  };

  const mezclar = (opciones) => {
    return opciones.sort(() => Math.random() - 0.5);
  };

  if (!jugando && !terminado) {
    return (
      <div className="reto">
        <h2>Reto Relámpago ⚡</h2>
        <p>Responde tantas preguntas como puedas en 30 segundos.</p>
        <button onClick={iniciarJuego}>¡Comenzar!</button>
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="reto">
        <h2>¡Tiempo terminado!</h2>
        <p>Tu puntaje: {puntaje}</p>
        <button onClick={iniciarJuego}>Jugar de nuevo</button>
      </div>
    );
  }

  const preguntaActual = preguntas[indice];
  const respuestas = mezclar([
    ...preguntaActual.incorrect_answers,
    preguntaActual.correct_answer
  ]);

  return (
    <div className="reto">
      <h3 dangerouslySetInnerHTML={{ __html: preguntaActual.question }} />
      <ul>
        {respuestas.map((resp, i) => (
          <li key={i}>
            <button onClick={() => manejarRespuesta(resp)} dangerouslySetInnerHTML={{ __html: resp }} />
          </li>
        ))}
      </ul>
      <div className="info">
        <span>⏱️ {tiempo}s</span>
        <span>Puntaje: {puntaje}</span>
      </div>
    </div>
  );
}

export default Original;
