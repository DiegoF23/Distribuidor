import React, { createContext, useContext } from "react";
import Stock from "../../pages/Stock";
import { CgProfile } from "react-icons/cg";
import { FaHouse,FaGear,FaBoxesStacked } from "react-icons/fa6";
import Login from "../../layouts/Login";

// Rutas definidas en el contexto
const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const routes = [
    { id: 1, icon:<FaHouse/> ,path: "/", name: "Home", element: <h2>Bienvenido al Home</h2> },
    {
      id: 2,
      icon: <CgProfile />,
      path: "/perfil",
      name: "Perfil",
      element: <h2>Esta es la página de Perfil</h2>,
    },
    {
      id: 3,
      icon: <FaGear />,
      path: "/configuracion",
      name: "Configuración",
      element: <h2>Configuración de usuario</h2>,
    }, 
    {
      id: 4,
      icon: <FaBoxesStacked />,
      path: "/stock",
      name: "Stock",
      element: <Stock />,
    },
    {
      id: 5,
      icon: <FaBoxesStacked />,
      path: "/login",
      name: "Login",
      element: <Login />,
    },
  ];

  return (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
  );
};

export const useRoutesContext = () => useContext(RoutesContext);
