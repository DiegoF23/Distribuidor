// src/components/Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import { useRoutesContext } from "../../contexts/Routes/RoutesContext";
import '../../styles/Dashboard/Dashboard.css';

const Dashboard = () => {
  const routes = useRoutesContext();

  return (
    <div className="container">
      {/* Menú */}
      <Menu />

      {/* Configuración de rutas */}
      <main className="dashboard-elements">
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;

