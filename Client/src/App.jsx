import React from "react";
import { useApiContext } from "./contexts/api/ApiContext";
import Dashboard from "./components/Default/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { RoutesProvider } from "./contexts/Routes/RoutesContext";
import Header from "./layouts/Header";
import Proveedores from "./pages/Proveedores";
import Clientes from "./pages/Clientes";
function App() {
  const { API_URL } = useApiContext();
  return (
    <>
      <BrowserRouter>
        <div>
          <h3>Api : {API_URL}</h3>
          <Header/>
          <RoutesProvider>
            <Dashboard />
          </RoutesProvider>
          <Proveedores API_URL={API_URL}/>
          <Clientes API_URL={API_URL} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
