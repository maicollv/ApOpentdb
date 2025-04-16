import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css'

function Favoritas() {

      const { id } = useParams();  // Asumimos que la URL lleva el id de la pregunta
      const [pregunta, setPregunta] = useState(null);  // Cambié el estado para manejar una pregunta individual
  
      useEffect(() => {
        // Aquí usamos la API de OpenTDB para obtener los detalles de la pregunta
        fetch(`https://opentdb.com/api.php?amount=1&question_category=9&id=${id}`)
          .then(response => response.json())
          .then(responseData => setPregunta(responseData.results[0])) // Almacenamos la primera pregunta que recibimos
          .catch(error => console.error("Error:", error));
      }, [id]);
  
      // Si no se encuentra la pregunta, mostramos un mensaje de carga
      if (!pregunta) return <p>Cargando...</p>;
  
      return (
        <div>
          <h2>{pregunta.category}</h2> {/* Muestra la categoría */}
          <p><strong>Dificultad:</strong> {pregunta.difficulty}</p> {/* Muestra la dificultad */}
          <p><strong>Pregunta:</strong> {pregunta.question}</p> {/* Muestra la pregunta */}
          
          <h3>Respuestas posibles:</h3>
          <ul>
            {pregunta.incorrect_answers.map((respuesta, index) => (
              <li key={index}>{respuesta}</li>  // Muestra las respuestas incorrectas
            ))}
          </ul>
          <h3>Respuesta correcta:</h3>
            <ul>
              <li><strong>{pregunta.correct_answer}</strong></li> 
            </ul>
            
        </div>
      );
  }
  
  
  

export default Favoritas