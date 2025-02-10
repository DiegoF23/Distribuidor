import React, { useState } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";
import "../../styles/Default/modal.css";

const CrearProducto = ({ onProductoCreado }) => {
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
      await axios.post(`${API_URL}/productos`, nuevoProducto);
      // Limpiar el formulario
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

      // Notificar al componente padre
      if (onProductoCreado) onProductoCreado();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div className="crear-producto-container">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="crear-producto-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
        />
        <p>Costo sin Iva</p>
        <input
          type="number"
          placeholder="Costo sin IVA"
          value={costoSIva}
          onChange={(e) => setCostoSIva(e.target.value)}
          required
        />
        <p>Costo con Iva</p>
        <input
          type="number"
          placeholder="Costo con IVA"
          value={costoCIva}
          onChange={(e) => setCostoCIva(e.target.value)}
          required
        />
        <p>Rentabilidad</p>
        <input
          type="number"
          placeholder="Rentabilidad (%)"
          value={rentabilidad}
          onChange={(e) => setRentabilidad(e.target.value)}
          required
        />
        <p>Precio</p>
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <p>Margen de ganancia</p>
        <input
          type="number"
          placeholder="Margen (%)"
          value={margen}
          onChange={(e) => setMargen(e.target.value)}
          required
        />
        <p>Tipo de envase</p>
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
        <p>Capacidad (ml)</p>
        <input
          type="number"
          placeholder="Capacidad (ml)"
          value={capacidadMl}
          onChange={(e) => setCapacidadMl(e.target.value)}
          required
        />
        <p>Stock Óptimo</p>
        <input
          type="number"
          placeholder="Stock Óptimo"
          value={stockOptimo}
          onChange={(e) => setStockOptimo(e.target.value)}
          required
        />
        <p>Stock Mínimo</p>
        <input
          type="number"
          placeholder="Stock Mínimo"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(e.target.value)}
          required
        />
        <div className="crear-producto-actions">
          <button type="button" onClick={() => console.log("Cancelar")}>Cancelar</button>
          <button type="submit">Crear Producto</button>
        </div>
      </form>
    </div>
  );
};

export default CrearProducto;
