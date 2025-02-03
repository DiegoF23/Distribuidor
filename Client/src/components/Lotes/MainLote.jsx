// src/components/Lotes/MainLote.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";
import { format } from 'date-fns';

const MainLote = ({ idSucursal, onActualizarLotes }) => {
  const { API_URL } = useApiContext();
  const [lotes, setLotes] = useState([]);
  const [lotesFiltrados, setLotesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);
    
    const [busqueda, setBusqueda] = useState("");
    const [busquedaUsuario, setBusquedaUsuario] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [capacidadSeleccionada, setCapacidadSeleccionada] = useState("");
    const [estadoStockSeleccionado, setEstadoStockSeleccionado] = useState(""); 
    const [ordenCantidad, setOrdenCantidad] = useState("Cantmayor");


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

  useEffect(() => {
        if (lotes) {
          let filtrado = [...lotes];
    
          if (busqueda) {
            filtrado = filtrado.filter((item) =>
              item.codigo_lote.toLowerCase().includes(busqueda.toLowerCase())

            );
          }
          if (productoSeleccionado) {
            filtrado = filtrado.filter((item) => item.producto === productoSeleccionado);
          }
          
          
          if (usuarioSeleccionado) {
            filtrado = filtrado.filter((item) => item.usuario_creador === usuarioSeleccionado);
          }
          
          if (ordenCantidad === "Cantmayor") {
            filtrado.sort((a, b) => b.total_unidades - a.total_unidades);
          } else if (ordenCantidad === "Cantmenor") {
            filtrado.sort((a, b) => a.total_unidades - b.total_unidades);
          } else if (ordenCantidad === "Costmayor") {
            filtrado.sort((a, b) => b.costo_lote - a.costo_lote);
          } else if (ordenCantidad === "Costmenor") {
            filtrado.sort((a, b) => a.costo_lote - b.costo_lote);
          } else if (ordenCantidad === "FechaCactual") {
            filtrado.sort((a, b) => {
              const dateA = new Date(a.fecha_creacion);
              const dateB = new Date(b.fecha_creacion);
              return dateB - dateA; // Ordenar de más reciente a más antiguo
            });
          } else if (ordenCantidad === "FechaCantigua") {
            filtrado.sort((a, b) => {
              const dateA = new Date(a.fecha_creacion);
              const dateB = new Date(b.fecha_creacion);
              return dateA - dateB; // Ordenar de más antiguo a más reciente
            });
          } else{}
          setLotesFiltrados(filtrado);
        }
      }, [lotes,busqueda, productoSeleccionado, usuarioSeleccionado, ordenCantidad]);
  
  // Función para manejar el clic en una fila
  const handleClickFila = (lote) => {
    setLoteSeleccionado(lote.id_lote === loteSeleccionado?.id_lote ? null : lote);
  };
  const limpiarFiltros = () => {
    setBusqueda("");
    setProductoSeleccionado("");
    setUsuarioSeleccionado("");
};
  const ProductosDisponibles = [...new Set(lotesFiltrados?.map(item => item.producto))];
  const UsuariosDisponibles = [...new Set(lotesFiltrados?.map(item => item.usuario_creador))];

  if (loading) return <p>Cargando lotes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Listado de Lotes</h1>
      <div className="container-filtroorden" style={{ display: "flex", gap: "2%" }}>
      <div className="container-filtros" style={{ display: "flex", gap: "2%" }}>
        
        <input
          type="text"
          placeholder="Buscar por nombre..."
          style={{ width: "10%", padding: "10px", marginBottom: "20px" }}
          value={busqueda} // Vinculamos el estado de búsqueda al valor del input
          onChange={(e) => setBusqueda(e.target.value)} // Actualizamos el estado al escribir
        />
        {/* Filtro por línea (marca) */}
        <select
          style={{ padding: "10px", marginBottom: "20px" }}
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona una Línea</option>
          {ProductosDisponibles.map((producto) => (
            <option key={producto} value={producto}>
              {producto}
            </option>
          ))}
        </select>
        <select
          style={{ padding: "10px", marginBottom: "20px" }}
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
        <option value="">Selecciona un Usuario</option>
        {UsuariosDisponibles.map((usuario_creador) => (
            <option key={usuario_creador} value={usuario_creador}>
              {usuario_creador}
            </option>
          ))}
      </select>
        <button onClick={limpiarFiltros} style={{ padding: "10px", marginBottom: "20px" }}>Limpiar Filtros</button>
      </div>
      <div className="container-orden" style={{ display: "flex", gap: "2%", marginLeft: "auto" }}>
      <label style={{ fontWeight: "bold"}}>Ordenar por: </label>
      <select
            style={{ padding: "10px", marginBottom: "20px" }}
            value={ordenCantidad}
            onChange={(e) => setOrdenCantidad(e.target.value)}
          >
            <option value="Cantmayor">Cantidad Mayor a Menor</option>
            <option value="Cantmenor">Cantidad Menor a Mayor</option>
            <option value="Costmayor">Costo Mayor a Menor</option>
            <option value="Costmenor">Costo Menor a Mayor</option>
            <option value="FechaCactual">Fecha Creación mas reciente</option>
            <option value="FechaCantigua">Fecha Creación mas antigua</option>
          </select>
      </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Código de Lote</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Producto</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Fecha de Creación</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Fecha de Vencimiento</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Cantidad Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Costo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sucursal</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Usuario Creador</th>
          </tr>
        </thead>
        <tbody>
          {lotesFiltrados.map((lote) => (
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
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{format(new Date(lote.fecha_creacion), "dd-MM-yyyy")}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{format(new Date(lote.fecha_vencimiento), "dd-MM-yyyy")}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{lote.total_unidades}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                  {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(lote.costo_lote)}
                </td>
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
                      <p><strong>Fecha de Creación:</strong> {format(new Date(lote.fecha_creacion), "dd-MM-yyyy")}</p>
                      <p><strong>Fecha de Vencimiento:</strong> {format(new Date(lote.fecha_vencimiento), "dd-MM-yyyy")}</p>
                      <p><strong>Costo del Lote:</strong> {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(lote.costo_lote)}</p>
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
