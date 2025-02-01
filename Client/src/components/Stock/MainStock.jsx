import React, { useEffect } from "react";
import { useStock } from "../../contexts/Stock/StockContext";

const MainStock = () => {
  const { stock, loading, error, obtenerStockSucursal } = useStock();

  // Obtener el stock de la sucursal 1 al cargar el componente
  useEffect(() => {
    obtenerStockSucursal(1); // Cambia el ID de la sucursal según sea necesario
  }, []);

  if (loading) return <p>Cargando stock...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Stock de la Sucursal</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Producto</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock Mínimo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Estado del Stock</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock Óptimo</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#e0f7fa" }}>Stock Total</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => {
            // Calcular el porcentaje de stock disponible respecto al stock óptimo
            const porcentajeStock = (item.cantidad_disponible / item.stock_optimo) * 100;

            return (
              <tr key={`${item.producto}-${item.sucursal}`} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.producto}</td>
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

                    {/* Texto del estado y valor numérico */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "14px",
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainStock;