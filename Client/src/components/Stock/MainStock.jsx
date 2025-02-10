import React, { useState, useEffect } from "react";
import { useStock } from "../../contexts/Stock/StockContext";
import { format } from 'date-fns';
import '../../styles/Components/Stock.css'

const MainStock = () => {
  const { stock, loading, error, obtenerStockSucursal } = useStock();
  const [stockFiltradoDefecto, setStockFiltradoDefecto] = useState();
  const [stockFiltrado, setStockFiltrado] = useState();
  const [busqueda, setBusqueda] = useState("");
  const [lineaSeleccionada, setLineaSeleccionada] = useState("");
  const [capacidadSeleccionada, setCapacidadSeleccionada] = useState("");
  const [estadoStockSeleccionado, setEstadoStockSeleccionado] = useState("");
  
  // Obtener el stock de la sucursal 1 al cargar el componente
  useEffect(() => {
    obtenerStockSucursal(1);
    limpiarFiltros(); // Limpiar filtros al cambiar de sucursal
  }, []);

  // Filtrar los productos por fecha de última actualización (más reciente a más antigua)
  useEffect(() => {
    if (stock) {
      const stockdefecto = [...stock].sort((a, b) => {
        const dateA = new Date(a.ultima_actualizacion);
        const dateB = new Date(b.ultima_actualizacion);
        return dateB - dateA; // Ordenar de más reciente a más antiguo
      });
      setStockFiltradoDefecto(stockdefecto);
    }
    if (stockFiltradoDefecto) {
      let filtrado = [...stockFiltradoDefecto];

      if (busqueda) {
        filtrado = filtrado.filter((item) =>
          item.producto.toLowerCase().includes(busqueda.toLowerCase())
        );
      }

      if (lineaSeleccionada) {
        filtrado = filtrado.filter((item) => item.marca === lineaSeleccionada);
      }

      if (capacidadSeleccionada) {
        filtrado = filtrado.filter(
          (item) => item.capacidad === Number(capacidadSeleccionada)
        );
      }

      if (estadoStockSeleccionado) {
        filtrado = filtrado.filter(
          (item) => item.estado_stock === estadoStockSeleccionado
        );
      }

      setStockFiltrado(filtrado);
    }
  }, [stock,busqueda, lineaSeleccionada,capacidadSeleccionada, estadoStockSeleccionado]);
  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setLineaSeleccionada("");
    setCapacidadSeleccionada("");
    setEstadoStockSeleccionado("");
};
  const marcasDisponibles = [...new Set(stockFiltrado?.map(item => item.marca))];
  const capacidadDisponibles = [...new Set(stockFiltrado?.map(item => item.capacidad))];
  const estadoDisponibles = [...new Set(stockFiltrado?.map(item => item.estado_stock))];
 
  if (loading) return <p>Cargando stock...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>Stock de la Sucursal</h3>
      <div className="container-filtros">
  <input
    type="text"
    placeholder="Buscar por nombre..."
    className="filtro-input"
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
  />
  
  <select
    className="filtro-input"
    value={lineaSeleccionada}
    onChange={(e) => setLineaSeleccionada(e.target.value)}
  >
    <option value="">Selecciona una Línea</option>
    {marcasDisponibles.map((marca) => (
      <option key={marca} value={marca}>
        {marca}
      </option>
    ))}
  </select>

  <select
    className="filtro-input"
    value={capacidadSeleccionada}
    onChange={(e) => setCapacidadSeleccionada(e.target.value)}
  >
    <option value="">Selecciona una Capacidad</option>
    {capacidadDisponibles.map((capacidad) => {
      const displayCapacidad =
        capacidad >= 1000 ? `${capacidad / 1000} L` : `${capacidad} ml`;
      return (
        <option key={capacidad} value={capacidad}>
          {displayCapacidad}
        </option>
      );
    })}
  </select>

  <select
    className="filtro-input"
    value={estadoStockSeleccionado}
    onChange={(e) => setEstadoStockSeleccionado(e.target.value)}
  >
    <option value="">Selecciona un Estado de Stock</option>
    {estadoDisponibles.map((estado_stock) => (
      <option key={estado_stock} value={estado_stock}>
        {estado_stock}
      </option>
    ))}
  </select>

  <button className="filtro-btn" onClick={limpiarFiltros}>
    Limpiar Filtros
  </button>
</div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Producto</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Linea</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Capacidad</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock Mínimo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Estado del Stock</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock Óptimo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "var(--color-primary-100)" }}>Stock Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ultima Actualización</th>
          </tr>
        </thead>
        <tbody>
          {(stockFiltrado || []).map((item) => {
            // Calcular el porcentaje de stock disponible respecto al stock óptimo
            const porcentajeStock = (item.cantidad_disponible / item.stock_optimo) * 100;
            const porcentajeStockMinimo = ((item.stock_minimo* 100) / item.stock_optimo);
            const capacidadfinal = item.capacidad>=1000 ? `${(item.capacidad/1000)}  L` : `${item.capacidad} ml`;
            return (
              <tr key={`${item.producto}-${item.sucursal}`} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.producto}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.marca}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{capacidadfinal}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{item.stock_minimo}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "10px",
                      height: "30px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Barra de progreso */}
                    <div
                      style={{
                        width: `${porcentajeStock}%`,
                        backgroundColor:
                          item.cantidad_disponible < item.stock_minimo
                            ? "#ff6b6b" // Rojo si está por debajo del mínimo
                            : item.cantidad_disponible < item.stock_optimo
                            ? "#ffd166" // Amarillo si está por debajo del óptimo
                            : "#06d6a0", // Verde si está en el nivel óptimo o superior
                        height: "100%",
                        borderRadius: "10px",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    ></div>
                    <div 
                      style={{ position: "absolute",
                       left: `${porcentajeStockMinimo}%`,
                        top: 0,
                         bottom: 0,
                          width: "2px",
                           background: "red" 
                           }}
                           ></div>

                    {/* Texto del estado y valor numérico */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "45%",
                        transform: "translate(-45%, -50%)",
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      {item.estado_stock} ({item.cantidad_disponible})
                    </div>
                  </div>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{item.stock_optimo}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center", backgroundColor: "#e0f7fa", fontWeight: "bold" }}>
                  {item.cantidad_disponible}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                  {format(new Date(item.ultima_actualizacion), "dd-MM-yyyy - HH-mm-ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainStock;