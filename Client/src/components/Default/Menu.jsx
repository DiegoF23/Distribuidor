// src/components/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Dashboard/Dashboard.css';
import { useRoutesContext } from "../../contexts/Routes/RoutesContext";

const Menu = () => {
  const routes = useRoutesContext();

  return (
    <nav className='MenuComponente'>
      <div className="menu-btn">
        {routes.map((route) => (
          <div 
          className={`btn-menu ${location.pathname === route.path ? "active" : ""}`}
           key={route.id}>
            <Link
              to={route.path}
              className="link"
            >
              {route.icon}
              {route.name}
            </Link>
           <br /><br />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;

