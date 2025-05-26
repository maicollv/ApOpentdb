import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [estado, setEstado] = useState(null);
  const [favoritos, setFavoritos] = useState([]); // Nuevo estado

  return (
    <AppContext.Provider value={{ estado, setEstado, favoritos, setFavoritos }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
