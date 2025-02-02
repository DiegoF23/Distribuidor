// src/components/Lotes/MainLote.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const MainLote = ({ idSucursal, onActualizarLotes }) => {
  const { API_URL } = useApiContext();
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);

  // Función para obtener los lotes de la sucursal
  const obtenerLotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/lotes/${idSucursal}`);
      setLotes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Obtener los lotes al cargar el componente o cuando cambie idSucursal
  useEffect(() => {
    obtenerLotes();
  }, [idSucursal]);

  // Función para manejar el clic en una fila
  const handleClickFila = (lote) => {
    setLoteSeleccionado(lote.id_lote === loteSeleccionado?.id_lote ? null : lote);
  };

  if (loading) return <p>Cargando lotes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Listado de Lotes</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Código de Lote</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Producto</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Fecha de Vencimiento</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Cantidad Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sucursal</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Usuario Creador</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote) => (
            <React.Fragment key={lote.id_lote}>
              <tr
                onClick={() => handleClickFila(lote)}
                style={{
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor: loteSeleccionado?.id_lote === lote.id_lote ? "#f0f0f0" : "transparent",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{lote.codigo_lote}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{lote.producto}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{lote.fecha_vencimiento}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{lote.total_unidades}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{lote.sucursal}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{lote.usuario_creador}</td>
              </tr>
              {loteSeleccionado?.id_lote === lote.id_lote && (
                <tr>
                  <td colSpan="6" style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <div style={{ backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
                      <h3>Detalles del Lote</h3>
                      <p><strong>Código de Lote:</strong> {lote.codigo_lote}</p>
                      <p><strong>Producto:</strong> {lote.producto}</p>
                      <p><strong>Fecha de Creación:</strong> {lote.fecha_creacion}</p>
                      <p><strong>Fecha de Vencimiento:</strong> {lote.fecha_vencimiento}</p>
                      <p><strong>Costo del Lote:</strong> ${lote.costo_lote}</p>
                      <p><strong>Configuración del Lote:</strong> {lote.configuracion_lote}</p>
                      <p><strong>Total de Unidades:</strong> {lote.total_unidades}</p>
                      <p><strong>Pallets:</strong> {lote.cantidad_pallets}</p>
                      <p><strong>Bases:</strong> {lote.cantidad_bases}</p>
                      <p><strong>Fardos:</strong> {lote.cantidad_fardos}</p>
                      <p><strong>Botellas:</strong> {lote.cantidad_botellas}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainLote;
