// src/components/Stock/MainStock.jsx
import React, { useEffect } from "react";
import { useStock } from "../../contexts/Stock/StockContext";
import "../../styles/style.css";

const BANNER_IMG =
  "https://www.arbentia.com/wp-content/uploads/2023/09/dos-personas-en-almacen-haciendo-inventario.png";

const MainStock = () => {
  const { stock, loading, error, obtenerStockSucursal } = useStock();

  useEffect(() => {
    obtenerStockSucursal(1);
  }, []);

  if (loading) return <p className="center">Cargando stock...</p>;
  if (error) return <p className="center">Error: {error}</p>;

  // estilos locales
  const hero = {
    position: "relative",
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 14px 34px rgba(2,8,23,.12)",
    background: `url(${BANNER_IMG}) center/cover no-repeat`,
  };
  const heroOverlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(2,6,23,.25) 0%, rgba(2,6,23,.65) 100%)",
  };
  const heroText = {
    position: "absolute",
    left: 20,
    bottom: 16,
    color: "#fff",
    textShadow: "0 2px 16px rgba(0,0,0,.35)",
  };
  const heroTitle = { margin: 0, fontSize: 28, lineHeight: 1.1, fontWeight: 800 };
  const heroSub = { margin: "6px 0 0", opacity: 0.9 };

  const legend = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 14,
  };
  const pill = (bg, txt = "#0b1220") => ({
    background: bg,
    color: txt,
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 8px 18px rgba(2,8,23,.08)",
  });
  const dot = (c) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: c,
  });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  return (
    <div className="container-page">
      {/* Banner superior */}
      <div style={hero} aria-label="Inventario y logística">
        <div style={heroOverlay} />
        <div style={heroText}>
          <h1 style={heroTitle}>Stock de la Sucursal</h1>
          <p style={heroSub}>
            Visión en tiempo real del inventario para planificar compras y
            reposición.
          </p>

          {/* Leyenda de estado */}
          <div style={legend}>
            <span style={pill("#eef2ff", "var(--color-primary-500)")}>
              <span style={dot("var(--color-primary-400)")} />
              Progreso
            </span>
            <span style={pill("#fee2e2", "#991b1b")}>
              <span style={dot("#ef4444")} />
              Bajo (debajo del mínimo)
            </span>
            <span style={pill("#fff7ed", "#9a3412")}>
              <span style={dot("#f59e0b")} />
              En camino al óptimo
            </span>
            <span style={pill("#ecfdf5", "#065f46")}>
              <span style={dot("#16a34a")} />
              Óptimo / Alto
            </span>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-wrap mt-3">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th className="num">Stock Mínimo</th>
              <th>Estado del Stock</th>
              <th className="num">Stock Óptimo</th>
              <th className="num">Stock Total</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => {
              const porcentaje =
                item.stock_optimo > 0
                  ? clamp(
                      (item.cantidad_disponible / item.stock_optimo) * 100,
                      0,
                      100
                    )
                  : 0;

              const color =
                item.cantidad_disponible < item.stock_minimo
                  ? "#ef4444" // bajo
                  : item.cantidad_disponible < item.stock_optimo
                  ? "#f59e0b" // medio
                  : "#16a34a"; // alto

              return (
                <tr key={`${item.producto}-${item.sucursal}`}>
                  <td>{item.producto}</td>
                  <td className="num">{item.stock_minimo}</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress__bar"
                        style={{
                          width: `${porcentaje}%`,
                          background: color,
                          transition: "width .35s ease",
                        }}
                        title={`${Math.round(porcentaje)}%`}
                      />
                      <div className="progress__txt">
                        {item.estado_stock} ({item.cantidad_disponible})
                      </div>
                    </div>
                  </td>
                  <td className="num">{item.stock_optimo}</td>
                  <td className="num">
                    <strong>{item.cantidad_disponible}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainStock;
