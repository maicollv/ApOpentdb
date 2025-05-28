import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import { supabase } from "./supabase";
import { AppProvider } from './contexto/contexto';

import Inicio from './componentes/inicio'
import Buscar from './componentes/buscar'
import Preguntas from './componentes/preguntas'
import Categorias from './componentes/Categorias'
import Favoritas from './componentes/favoritas'
import Configuracion from './componentes/configuracion'
import Menu from './componentes/menu'
import Login from './componentes/login/login';
import Original from './componentes/original';
import Registro from './componentes/registro';
function App() {

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    // Escucha cambios en la sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}

        <Routes>
          <Route path="/" element={usuario ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/buscar" element={usuario ? <Buscar /> : <Navigate to="/login" />} />
          <Route path="/preguntas" element={usuario ? <Preguntas /> :<Navigate to="/login" />} />
          <Route path="/categorias" element={usuario ? <Categorias /> :<Navigate to="/login" />} />
          <Route path="/favoritas" element={usuario ? <Favoritas /> :<Navigate to="/login" />} />
          <Route path="/configuracion" element={usuario ? <Configuracion /> :<Navigate to="/login" />} />
          <Route path='/original' element={usuario ? <Original /> :<Navigate to="login" />} />
          <Route path='/registro' element={<Registro />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </AppProvider>

  
  );
}

export default App
