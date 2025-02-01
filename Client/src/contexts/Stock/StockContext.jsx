import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../api/ApiContext";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const { API_URL } = useApiContext();
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el stock de una sucursal
  const obtenerStockSucursal = async (id_sucursal) => {
    try {
      const response = await axios.get(`${API_URL}/stock/${id_sucursal}`);
      setStock(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <StockContext.Provider value={{ stock, loading, error, obtenerStockSucursal }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);