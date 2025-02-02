const { getConnection } = require("../config/DB/db");

// Función para obtener el stock de una sucursal
exports.obtenerStockSucursal = async (req, res) => {
  let connection;
  const { id_sucursal } = req.params;

  if (!id_sucursal) {
    return res.status(400).json({ message: "ID de la sucursal es requerido." });
  }

  try {
    connection = await getConnection();

    // Consulta SQL para obtener el stock de la sucursal
    const [rows] = await connection.execute(
      `SELECT 
         p.nombre AS producto,
         p.marca AS marca,
         p.capacidad_ml AS capacidad,
         s.nombre AS sucursal,
         st.cantidad_disponible,
         p.stock_optimo,
         p.stock_minimo,
         st.ultima_actualizacion,
         EstadoStock(p.id_producto, s.id_sucursal) AS estado_stock
       FROM Stock st
       JOIN Producto p ON st.id_producto = p.id_producto
       JOIN Sucursal s ON st.id_sucursal = s.id_sucursal
       WHERE st.id_sucursal = ?`,
      [id_sucursal]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener el stock de la sucursal:", error);
    res.status(500).json({ message: "Error al obtener el stock de la sucursal" });
  } finally {
    if (connection) await connection.end();
  }
};

