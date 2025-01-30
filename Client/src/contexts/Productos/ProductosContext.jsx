import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../api/ApiContext"; // Importar el contexto de la API

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener la URL base de la API desde el contexto
  const { API_URL } = useApiContext();

  // Función para obtener los productos desde el backend
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Obtener los productos al cargar el componente
  useEffect(() => {
    obtenerProductos();
  }, [API_URL]); // Dependencia: API_URL

  return (
    <ProductosContext.Provider value={{ productos, loading, error,obtenerProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);