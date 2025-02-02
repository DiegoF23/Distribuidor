// src/components/Lotes/CrearLote.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const CrearLote = ({ idSucursal, onLoteCreado }) => {
  const { API_URL } = useApiContext();
  const [productos, setProductos] = useState([]);
  const [configuraciones, setConfiguraciones] = useState([]);
  
  // Campos del formulario
  const [id_producto, setIdProducto] = useState("");
  const [id_configuracion, setIdConfiguracion] = useState("");
  const [codigo_lote, setCodigoLote] = useState("");
  const [fecha_vencimiento, setFechaVencimiento] = useState("");
  const [costo_lote, setCostoLote] = useState("");
  const [cantidad_pallets, setCantidadPallets] = useState(0);
  const [cantidad_bases, setCantidadBases] = useState(0);
  const [cantidad_fardos, setCantidadFardos] = useState(0);
  const [cantidad_botellas, setCantidadBotellas] = useState(0);
  const [totalBotellasCalculado, setTotalBotellasCalculado] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener la lista de productos y configuraciones desde la BD
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`${API_URL}/productos`);
        setProductos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchConfiguraciones = async () => {
      try {
        // Se asume que existe un endpoint para obtener las configuraciones de lote
        const res = await axios.get(`${API_URL}/lote_configuraciones`);
        setConfiguraciones(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductos();
    fetchConfiguraciones();
  }, [API_URL]);

  // Calcular el total de botellas utilizando la configuración seleccionada
  useEffect(() => {
    if (id_configuracion) {
      const config = configuraciones.find(
        (c) => c.id_configuracion === parseInt(id_configuracion)
      );
      if (config) {
        const total =
          (parseInt(cantidad_pallets) * config.bases_por_pallet * config.fardos_por_base * config.botellas_por_fardo) +
          (parseInt(cantidad_bases) * config.fardos_por_base * config.botellas_por_fardo) +
          (parseInt(cantidad_fardos) * config.botellas_por_fardo) +
          parseInt(cantidad_botellas);
        setTotalBotellasCalculado(total);
      }
    }
  }, [
    id_configuracion,
    cantidad_pallets,
    cantidad_bases,
    cantidad_fardos,
    cantidad_botellas,
    configuraciones
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const nuevoLote = {
        id_producto,
        id_configuracion,
        codigo_lote,
        fecha_vencimiento,
        costo_lote,
        cantidad_pallets,
        cantidad_bases,
        cantidad_fardos,
        cantidad_botellas,
        id_sucursal: idSucursal,
        id_usuario: 1 // Por ahora usamos el usuario 1
      };
      const res = await axios.post(`${API_URL}/lotes`, nuevoLote);
      console.log("Lote creado", res.data);
      setLoading(false);
      onLoteCreado(); // Notifica para refrescar la lista
    } catch (err) {
      console.error(err);
      setError("Error al crear el lote");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Nuevo Lote</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Producto:</label>
          <select
            value={id_producto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.id_producto} value={prod.id_producto}>
                {prod.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Configuración de Lote:</label>
          <select
            value={id_configuracion}
            onChange={(e) => setIdConfiguracion(e.target.value)}
            required
          >
            <option value="">Seleccione una configuración</option>
            {configuraciones.map((conf) => (
              <option key={conf.id_configuracion} value={conf.id_configuracion}>
                {conf.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Código de Lote:</label>
          <input
            type="text"
            value={codigo_lote}
            onChange={(e) => setCodigoLote(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            value={fecha_vencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Costo del Lote:</label>
          <input
            type="number"
            value={costo_lote}
            onChange={(e) => setCostoLote(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad de Pallets:</label>
          <input
            type="number"
            value={cantidad_pallets}
            onChange={(e) => setCantidadPallets(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad de Bases:</label>
          <input
            type="number"
            value={cantidad_bases}
            onChange={(e) => setCantidadBases(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad de Fardos:</label>
          <input
            type="number"
            value={cantidad_fardos}
            onChange={(e) => setCantidadFardos(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad de Botellas Sueltas:</label>
          <input
            type="number"
            value={cantidad_botellas}
            onChange={(e) => setCantidadBotellas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total de Botellas Calculado:</label>
          <input type="number" value={totalBotellasCalculado} readOnly />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Lote"}
        </button>
      </form>
    </div>
  );
};

export default CrearLote;
