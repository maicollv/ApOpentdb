import { useState, useEffect } from 'react';

function Configuracion() {
  const [mensaje, setMensaje] = useState('');

  const [temaOscuro, setTemaOscuro] = useState(() => {
    return localStorage.getItem('temaOscuro') === 'true' || false;
  });

  const [tamFuente, setTamFuente] = useState(() => {
    return localStorage.getItem('tamFuente') || 'mediano';
  });

  // Aplica tema oscuro o claro en <body>
  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add('tema-oscuro');
    } else {
      document.body.classList.remove('tema-oscuro');
    }
    localStorage.setItem('temaOscuro', temaOscuro);
  }, [temaOscuro]);

  // Aplica tamaño de fuente en <body>
  useEffect(() => {
    localStorage.setItem('tamFuente', tamFuente);
    document.body.style.fontSize =
      tamFuente === 'pequeño' ? '14px' :
      tamFuente === 'grande' ? '20px' : '16px';
  }, [tamFuente]);

  return (
    <div style={{ padding: '20px', maxWidth: 500, margin: 'auto' }}>
      <h2>Configuración</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>Preferencias</h3>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={temaOscuro}
              onChange={() => setTemaOscuro(!temaOscuro)}
              style={{ marginRight: '8px' }}
            />
            Tema oscuro
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="selectTamFuente">Tamaño de fuente:</label>
          <select
            id="selectTamFuente"
            value={tamFuente}
            onChange={e => setTamFuente(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      </section>

      <section>
        <h3>Acerca de la app</h3>
        <p>Esta aplicación fue desarrollada para ofrecerte una experiencia personalizada.</p>
        <p>Versión: 1.0.0</p>
      </section>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
    </div>
  );
}

export default Configuracion;
