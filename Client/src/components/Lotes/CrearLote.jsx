import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const SIDE_IMG =
  "https://media.istockphoto.com/id/872753126/es/foto/cajas-de-cart%C3%B3n-en-pallets-con-montacargas-de-env%C3%ADo.jpg?s=170667a&w=0&k=20&c=NdP80q5e_dNRkNOljJF69XDgk82AbykEhmmHN2t3Nyw=";

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

  // Helpers
  const selectedConfig = useMemo(
    () =>
      configuraciones.find(
        (c) => c.id_configuracion === parseInt(id_configuracion)
      ),
    [configuraciones, id_configuracion]
  );

  const fmtMoney = (n) =>
    n === "" || n == null
      ? "-"
      : new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
          maximumFractionDigits: 2,
        }).format(Number(n));

  // Carga inicial
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
        const res = await axios.get(`${API_URL}/lote_configuraciones`);
        setConfiguraciones(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductos();
    fetchConfiguraciones();
  }, [API_URL]);

  // Cálculo total
  useEffect(() => {
    if (!selectedConfig) return;
    const toInt = (v) => parseInt(v || 0, 10);

    const total =
      toInt(cantidad_pallets) *
        selectedConfig.bases_por_pallet *
        selectedConfig.fardos_por_base *
        selectedConfig.botellas_por_fardo +
      toInt(cantidad_bases) *
        selectedConfig.fardos_por_base *
        selectedConfig.botellas_por_fardo +
      toInt(cantidad_fardos) * selectedConfig.botellas_por_fardo +
      toInt(cantidad_botellas);

    setTotalBotellasCalculado(total || 0);
  }, [
    selectedConfig,
    cantidad_pallets,
    cantidad_bases,
    cantidad_fardos,
    cantidad_botellas,
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
        id_usuario: 1, // temporal
      };
      await axios.post(`${API_URL}/lotes`, nuevoLote);
      setLoading(false);
      onLoteCreado && onLoteCreado();
    } catch (err) {
      console.error(err);
      setError("Error al crear el lote");
      setLoading(false);
    }
  };

  // -------- UI --------
  const wrap = {
    display: "grid",
    gridTemplateColumns: "minmax(360px, 520px) 1fr",
    gap: 22,
    alignItems: "stretch",
    padding: "16px 18px 24px",
  };
  const card = {
    background: "#fff",
    border: "1px solid #e6ebf1",
    borderRadius: 16,
    boxShadow: "0 10px 24px rgba(15,23,42,.06)",
  };
  const panel = { ...card, padding: 18 };
  const label = {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
    display: "block",
    fontWeight: 600,
  };
  const input = {
    width: "100%",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "12px 14px",
    outline: "none",
    transition: "border .2s, box-shadow .2s",
  };
  const row = { marginBottom: 12 };
  const kbd = {
    display: "inline-block",
    background: "#eef2ff",
    color: "#3730a3",
    borderRadius: 999,
    padding: "2px 10px",
    fontSize: 12,
    marginLeft: 8,
    verticalAlign: "middle",
    fontWeight: 700,
  };
  const side = {
    ...card,
    position: "relative",
    overflow: "hidden",
    minHeight: 520,
    background: `url(${SIDE_IMG}) center/cover no-repeat`,
  };
  const sideOverlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(2,6,23,.1) 0%, rgba(2,6,23,.55) 100%)",
  };
  const sideCaption = {
    position: "absolute",
    left: 18,
    bottom: 16,
    color: "#fff",
    fontWeight: 700,
    textShadow: "0 2px 10px rgba(0,0,0,.35)",
  };
  const h2 = { margin: 0, fontSize: 22 };
  const btn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    borderRadius: 12,
    padding: "12px 14px",
    background: "var(--color-primary-400)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(56,97,251,.18)",
  };
  const hint = { fontSize: 12, color: "#64748b", marginTop: 4 };

  return (
    <div className="container-page">
      <div style={wrap}>
        {/* Left: Form */}
        <section style={panel}>
          <div style={{ marginBottom: 12 }}>
            <h2 style={h2}>Crear Nuevo Lote</h2>
          </div>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                borderRadius: 12,
                padding: "10px 12px",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={row}>
              <label style={label}>Producto</label>
              <select
                value={id_producto}
                onChange={(e) => setIdProducto(e.target.value)}
                required
                style={input}
              >
                <option value="">Seleccione un producto</option>
                {productos.map((prod) => (
                  <option key={prod.id_producto} value={prod.id_producto}>
                    {prod.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={row}>
              <label style={label}>Configuración de Lote</label>
              <select
                value={id_configuracion}
                onChange={(e) => setIdConfiguracion(e.target.value)}
                required
                style={input}
              >
                <option value="">Seleccione una configuración</option>
                {configuraciones.map((conf) => (
                  <option
                    key={conf.id_configuracion}
                    value={conf.id_configuracion}
                  >
                    {conf.descripcion}
                  </option>
                ))}
              </select>
              {selectedConfig && (
                <div style={hint}>
                  {selectedConfig.bases_por_pallet} bases/pallet ·{" "}
                  {selectedConfig.fardos_por_base} fardos/base ·{" "}
                  {selectedConfig.botellas_por_fardo} botellas/fardo
                </div>
              )}
            </div>

            <div style={row}>
              <label style={label}>Código de Lote</label>
              <input
                type="text"
                value={codigo_lote}
                onChange={(e) => setCodigoLote(e.target.value)}
                required
                placeholder="Ej.: L20240315-A"
                style={input}
              />
            </div>

            <div style={row}>
              <label style={label}>Fecha de Vencimiento</label>
              <input
                type="date"
                value={fecha_vencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                required
                style={input}
              />
            </div>

            <div style={row}>
              <label style={label}>
                Costo del Lote <span style={kbd}>{fmtMoney(costo_lote)}</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={costo_lote}
                onChange={(e) => setCostoLote(e.target.value)}
                required
                placeholder="0.00"
                style={input}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={row}>
                <label style={label}>Cantidad de Pallets</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={cantidad_pallets}
                  onChange={(e) => setCantidadPallets(e.target.value)}
                  required
                  style={input}
                />
              </div>
              <div style={row}>
                <label style={label}>Cantidad de Bases</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={cantidad_bases}
                  onChange={(e) => setCantidadBases(e.target.value)}
                  required
                  style={input}
                />
              </div>
              <div style={row}>
                <label style={label}>Cantidad de Fardos</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={cantidad_fardos}
                  onChange={(e) => setCantidadFardos(e.target.value)}
                  required
                  style={input}
                />
              </div>
              <div style={row}>
                <label style={label}>Botellas sueltas</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={cantidad_botellas}
                  onChange={(e) => setCantidadBotellas(e.target.value)}
                  required
                  style={input}
                />
              </div>
            </div>

            <div style={{ ...row, marginTop: 4 }}>
              <label style={label}>Total de Botellas Calculado</label>
              <input
                type="number"
                value={totalBotellasCalculado}
                readOnly
                style={{ ...input, background: "#f1f5f9", fontWeight: 800 }}
              />
              <div style={hint}>
                Se recalcula automáticamente según la configuración elegida.
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <button type="submit" disabled={loading} style={btn}>
                {loading ? "Creando..." : "Crear Lote"}
              </button>
            </div>
          </form>
        </section>

        {/* Right: Side image */}
        <aside style={side} aria-label="Centro logístico, pallets y montacargas">
          <div style={sideOverlay} />
          <div style={sideCaption}>
            Centro logístico · Pallets & Distribución
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CrearLote;
