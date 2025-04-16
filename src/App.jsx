import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Inicio from './componentes/inicio'
import Buscar from './componentes/buscar'
import Preguntas from './componentes/preguntas'
import Categorias from './componentes/Categorias'
import Favoritas from './componentes/favoritas'
import Configuracion from './componentes/configuracion'
import Menu from './componentes/menu';

function App() {
  

  return (
    <Router>

      <Menu />
     
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/favoritas" element={<Favoritas />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
   
    </Router>
  )
}

export default App
