import React, { createContext, useContext } from "react";
import Stock from "../../pages/Stock";
import Productos from "../../pages/Productos";
import { ProductosProvider } from "../Productos/ProductosContext";
import { CgProfile } from "react-icons/cg";
import { FaHouse, FaGear, FaBoxesStacked } from "react-icons/fa6";
import { FaUser, FaTruckLoading,FaHandshake } from "react-icons/fa";
import { PiBeerBottleFill, PiUserListBold } from "react-icons/pi";
import { FaPallet } from "react-icons/fa";
import Login from "../../layouts/Login";
import Proveedores from "../../pages/Proveedores";
import Clientes from "../../pages/Clientes";
import Lotes from "../../pages/Lotes";
import Socios from "../../pages/Socios";
// Rutas definidas en el contexto
const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const routes = [
    {
      id: 1,
      icon: <FaHouse />,
      path: "/",
      name: "Home",
      element: <h2>Bienvenido al Home</h2>,
    },
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
      icon: <PiBeerBottleFill />,
      path: "/productos",
      name: "Productos",
      element: (
        <ProductosProvider>
          <Productos />
        </ProductosProvider>
      ),
    },
    {
      id: 6,
      icon: <FaUser />,
      path: "/login",
      name: "Login",
      element: <Login />,
    },
    {
      id: 7,
      icon: <FaTruckLoading />,
      path: "/Proveedores",
      name: "Proveedores",
      element: <Proveedores />,
    },
    {
      id: 8,
      icon: <PiUserListBold />,
      path: "/Clientes",
      name: "Clientes",
      element: <Clientes />,
    },
    {
      id: 9,
      icon: <FaPallet />,
      path: "/Lotes",
      name: "Lotes",
      element: <Lotes />,
    },
    {
      id: 10,
      icon: <FaHandshake />,
      path: "/Socios",
      name: "Socios",
      element: <Socios />,
    },

    
  ];

  return (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
  );
};

export const useRoutesContext = () => useContext(RoutesContext);
