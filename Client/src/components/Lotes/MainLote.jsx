import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";
import "../../styles/style.css";

// Imagen específica para Coca-Cola (la que enviaste) y un fallback genérico
const COCA_IMG =
  "https://thumbs.dreamstime.com/b/carro-de-salida-de-la-coca-cola-20911825.jpg";
const GENERIC_IMG =
  "https://mesumex.com/cdn/shop/articles/montacargas_2_1200x1200.jpg?v=1680235716";

const MainLote = ({ idSucursal, onActualizarLotes }) => {
  const { API_URL } = useApiContext();
  const [lotes, setLotes] = useState([]);
  const [lotesFiltrados, setLotesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);

  // Helpers UI
  const fmtDate = (v) => {
    if (!v) return "-";
    try {
      const dt = new Date(v);
      return new Intl.DateTimeFormat("es-AR", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(dt);
    } catch {
      return v;
    }
  };

  const fmtMoney = (n) => {
    if (n == null) return "-";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }).format(Number(n));
  };

  const vencimientoBadge = (isoDate) => {
    if (!isoDate) return <span className="badge">Sin fecha</span>;
    const today = new Date();
    const d = new Date(isoDate);
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24)); // días
    if (diff < 0) return <span className="badge danger">Vencido</span>;
    if (diff <= 30) return <span className="badge warning">Próximo a vencer</span>;
    return <span className="badge success">OK</span>;
  };

  const bannerFor = (lote) => {
    const p = (lote?.producto || "").toLowerCase();
    return p.includes("coca") ? COCA_IMG : GENERIC_IMG;
  };

  // Data
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

  useEffect(() => {
    obtenerLotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSucursal]);

  const handleClickFila = (lote) => {
    setLoteSeleccionado(
      lote.id_lote === loteSeleccionado?.id_lote ? null : lote
    );
  };
  const limpiarFiltros = () => {
    setBusqueda("");
    setProductoSeleccionado("");
    setUsuarioSeleccionado("");
};
  const ProductosDisponibles = [...new Set(lotesFiltrados?.map(item => item.producto))];
  const UsuariosDisponibles = [...new Set(lotesFiltrados?.map(item => item.usuario_creador))];

  if (loading) return <p className="center">Cargando lotes...</p>;
  if (error) return <p className="center">Error: {error}</p>;

  return (
    <div className="container-page">
      <h1 className="center">Listado de Lotes</h1>

      <div className="table-wrap mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Código de Lote</th>
              <th>Producto</th>
              <th>Fecha de Vencimiento</th>
              <th className="num">Cantidad Total</th>
              <th>Sucursal</th>
              <th>Usuario Creador</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote) => {
              const active = loteSeleccionado?.id_lote === lote.id_lote;
              return (
                <React.Fragment key={lote.id_lote}>
                  <tr
                    onClick={() => handleClickFila(lote)}
                    style={{
                      cursor: "pointer",
                      background: active ? "#f0f6ff" : "transparent",
                    }}
                  >
                    <td>
                      <strong>{lote.codigo_lote}</strong>
                    </td>
                    <td>{lote.producto}</td>
                    <td>
                      {fmtDate(lote.fecha_vencimiento)}&nbsp;
                      {vencimientoBadge(lote.fecha_vencimiento)}
                    </td>
                    <td className="num">{lote.total_unidades}</td>
                    <td>{lote.sucursal}</td>
                    <td>{lote.usuario_creador}</td>
                  </tr>

                  {active && (
                    <tr>
                      <td colSpan="6">
                        <div className="card mt-2" style={{ overflow: "hidden" }}>
                          {/* Banner con imagen */}
                          <div
                            aria-label="Imagen ilustrativa del lote"
                            style={{
                              position: "relative",
                              height: 160,
                              width: "100%",
                              background: `url(${bannerFor(
                                lote
                              )}) center/cover no-repeat`,
                              borderRadius: 12,
                              marginBottom: 12,
                            }}
                          >
                            {/* Degradado y rótulo */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                  "linear-gradient(0deg, rgba(15,23,42,.55), rgba(15,23,42,.15))",
                                borderRadius: 12,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: 16,
                                bottom: 12,
                                color: "#fff",
                                textShadow: "0 2px 10px rgba(0,0,0,.35)",
                                fontWeight: 700,
                              }}
                            >
                              {lote.producto} · {lote.codigo_lote}
                            </div>
                          </div>

                          {/* Grid detalles */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1.2fr .8fr",
                              gap: 18,
                            }}
                          >
                            {/* Columna izquierda */}
                            <div>
                              <h3 style={{ margin: "0 0 8px" }}>
                                <strong>Detalles del Lote</strong>
                              </h3>
                              <p>
                                <strong>Código de Lote:</strong>{" "}
                                <span style={{ fontWeight: 800 }}>
                                  {lote.codigo_lote}
                                </span>
                              </p>
                              <p>
                                <strong>Producto:</strong> {lote.producto}
                              </p>
                              <p>
                                <strong>Fecha de Creación:</strong>{" "}
                                {fmtDate(lote.fecha_creacion)}
                              </p>
                              <p>
                                <strong>Fecha de Vencimiento:</strong>{" "}
                                {fmtDate(lote.fecha_vencimiento)}&nbsp;
                                {vencimientoBadge(lote.fecha_vencimiento)}
                              </p>
                              <p>
                                <strong>Costo del Lote:</strong>{" "}
                                {fmtMoney(lote.costo_lote)}
                              </p>
                              <p>
                                <strong>Configuración del Lote:</strong>{" "}
                                {lote.configuracion_lote}
                              </p>
                              <p>
                                <strong>Total de Unidades:</strong>{" "}
                                <span style={{ fontWeight: 800 }}>
                                  {lote.total_unidades?.toLocaleString("es-AR")}
                                </span>
                              </p>
                            </div>

                            {/* Columna derecha: KPIs */}
                            <div>
                              <div className="kpis">
                                <div className="kpi">
                                  <span>Pallets</span>
                                  <span className="val">
                                    {lote.cantidad_pallets}
                                  </span>
                                </div>
                                <div className="kpi">
                                  <span>Bases</span>
                                  <span className="val">
                                    {lote.cantidad_bases}
                                  </span>
                                </div>
                                <div className="kpi">
                                  <span>Fardos</span>
                                  <span className="val">
                                    {lote.cantidad_fardos}
                                  </span>
                                </div>
                                <div className="kpi">
                                  <span>Botellas</span>
                                  <span className="val">
                                    {lote.cantidad_botellas}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainLote;
