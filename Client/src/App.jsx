import React from "react";
import { useApiContext } from "./contexts/api/ApiContext";
import Dashboard from "./components/Default/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { RoutesProvider } from "./contexts/Routes/RoutesContext";
import Header from "./layouts/Header";
import Login from "./layouts/Login";
function App() {
  const { API_URL } = useApiContext();
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <h3>Api : {API_URL}</h3> */}
          <Header/>
          <RoutesProvider>
            
            <Dashboard />
          </RoutesProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
