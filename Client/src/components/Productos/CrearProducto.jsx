import React, { useState } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const CrearProducto = ({ onProductoCreado}) => {
  const { API_URL } = useApiContext();

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [costoSIva, setCostoSIva] = useState(0);
  const [costoCIva, setCostoCIva] = useState(0);
  const [rentabilidad, setRentabilidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [margen, setMargen] = useState(0);
  const [tipoEnvase, setTipoEnvase] = useState("botella");
  const [capacidadMl, setCapacidadMl] = useState(0);
  const [stockOptimo, setStockOptimo] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      marca,
      costo_S_Iva: costoSIva,
      costo_C_Iva: costoCIva,
      rentabilidad,
      precio,
      margen,
      tipo_envase: tipoEnvase,
      capacidad_ml: capacidadMl,
      stock_optimo: stockOptimo,
      stock_minimo: stockMinimo,
    };

    try {
      const response = await axios.post(`${API_URL}/productos`, nuevoProducto);
      console.log("Producto creado:", response.data);

      // Limpiar el formulario después de crear el producto
      setNombre("");
      setMarca("");
      setCostoSIva(0);
      setCostoCIva(0);
      setRentabilidad(0);
      setPrecio(0);
      setMargen(0);
      setTipoEnvase("botella");
      setCapacidadMl(0);
      setStockOptimo(0);
      setStockMinimo(0);

      // Notificar al componente padre que se creó un producto
      if (onProductoCreado) onProductoCreado();  
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Costo sin IVA:</label>
          <input
            type="number"
            value={costoSIva}
            onChange={(e) => setCostoSIva(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Costo con IVA:</label>
          <input
            type="number"
            value={costoCIva}
            onChange={(e) => setCostoCIva(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rentabilidad (%):</label>
          <input
            type="number"
            value={rentabilidad}
            onChange={(e) => setRentabilidad(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Margen (%):</label>
          <input
            type="number"
            value={margen}
            onChange={(e) => setMargen(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo de Envase:</label>
          <select
            value={tipoEnvase}
            onChange={(e) => setTipoEnvase(e.target.value)}
            required
          >
            <option value="botella">Botella</option>
            <option value="lata">Lata</option>
            <option value="envase_retornable">Envase Retornable</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div>
          <label>Capacidad (ml):</label>
          <input
            type="number"
            value={capacidadMl}
            onChange={(e) => setCapacidadMl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Óptimo:</label>
          <input
            type="number"
            value={stockOptimo}
            onChange={(e) => setStockOptimo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Mínimo:</label>
          <input
            type="number"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;