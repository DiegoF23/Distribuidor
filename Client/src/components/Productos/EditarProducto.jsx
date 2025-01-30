import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const EditarProducto = ({ producto, onProductoEditado, onCancelar }) => {
  const { API_URL } = useApiContext();

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState(producto.nombre);
  const [marca, setMarca] = useState(producto.marca);
  const [costoSIva, setCostoSIva] = useState(producto.costo_S_Iva);
  const [costoCIva, setCostoCIva] = useState(producto.costo_C_Iva);
  const [rentabilidad, setRentabilidad] = useState(producto.rentabilidad);
  const [precio, setPrecio] = useState(producto.precio);
  const [margen, setMargen] = useState(producto.margen);
  const [tipoEnvase, setTipoEnvase] = useState(producto.tipo_envase);
  const [capacidadMl, setCapacidadMl] = useState(producto.capacidad_ml);
  const [stockOptimo, setStockOptimo] = useState(producto.stock_optimo);
  const [stockMinimo, setStockMinimo] = useState(producto.stock_minimo);
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productoActualizado = {
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
      await axios.put(`${API_URL}/productos/${producto.id_producto}`, productoActualizado);
      onProductoEditado(); // Notificar al componente padre que se editó el producto
    } catch (error) {
      console.error("Error al editar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario (igual que en CrearProducto) */}
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
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button type="button" onClick={onCancelar} disabled={loading}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;