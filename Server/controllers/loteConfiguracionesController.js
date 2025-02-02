// controllers/loteConfiguracionesController.js
const { getConnection } = require("../config/DB/db");

exports.obtenerConfiguraciones = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT 
         id_configuracion, 
         descripcion, 
         cantidad_pallets, 
         bases_por_pallet, 
         fardos_por_base, 
         botellas_por_fardo 
       FROM Lote_Configuracion`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener configuraciones de lote:", error);
    res.status(500).json({ message: "Error al obtener configuraciones de lote" });
  } finally {
    if (connection) await connection.end();
  }
};
