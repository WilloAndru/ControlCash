import { useState } from "react";

export const MiContexto = createContext();

export const MiProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("Wilson");

  return (
    <MiContexto.Provider value={{ usuario, setUsuario }}>
      {children}
    </MiContexto.Provider>
  );
};
