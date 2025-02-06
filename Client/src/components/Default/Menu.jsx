// src/components/Menu.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Dashboard/Dashboard.css";
import { useRoutesContext } from "../../contexts/Routes/RoutesContext";

const Menu = () => {
  const routes = useRoutesContext();
  const location = useLocation(); // Obtener la ruta actual

  return (
    <nav className="MenuComponente">
      <div className="menu-btn">
        {routes.map((route) => (
          <Link
            to={route.path}
            key={route.id}
            className={`btn-menu link ${location.pathname === route.path ? "active" : ""}`}
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
