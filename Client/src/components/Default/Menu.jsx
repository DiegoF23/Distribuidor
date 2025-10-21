import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/Dashboard/Dashboard.css';
import { useRoutesContext } from "../../contexts/Routes/RoutesContext";

const Menu = () => {
  const routes = useRoutesContext();

  return (
    <nav className='MenuComponente'>
      <div className="menu-btn">
        {routes.map((route) => (
          <div className="btn-menu" key={route.id}>
            <NavLink
              to={route.path}
              className={({isActive}) => `link ${isActive ? 'active' : ''}`}
            >
              {route.icon}
              {route.name}
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
