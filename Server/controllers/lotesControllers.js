const { getConnection } = require("../config/DB/db");

// Función para obtener los lotes de una sucursal con detalles completos
exports.obtenerLotesPorSucursal = async (req, res) => {
  let connection;
  const { id_sucursal } = req.params;

  if (!id_sucursal) {
    return res.status(400).json({ message: "ID de la sucursal es requerido." });
  }

  try {
    connection = await getConnection();

    const [rows] = await connection.execute(
      `SELECT 
         l.id_lote,
         l.codigo_lote,
         p.nombre AS producto,
         l.fecha_vencimiento,
         l.fecha_creacion,
         l.costo_lote,
         l.total_unidades,
         l.cantidad_pallets,
         l.cantidad_bases,
         l.cantidad_fardos,
         l.cantidad_botellas,
         lc.descripcion AS configuracion_lote,
         s.nombre AS sucursal,
         CONCAT(u.nombre, ' ', u.apellido) AS usuario_creador
       FROM Lote l
       JOIN Producto p ON l.id_producto = p.id_producto
       JOIN Lote_Configuracion lc ON l.id_configuracion = lc.id_configuracion
       JOIN Sucursal s ON l.id_sucursal = s.id_sucursal
       JOIN Usuario u ON l.id_usuario = u.id_usuario
       WHERE l.id_sucursal = ?`,
      [id_sucursal]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los lotes:", error);
    res.status(500).json({ message: "Error al obtener los lotes" });
  } finally {
    if (connection) await connection.end();
  }
};

// Función para crear un nuevo lote
exports.crearLote = async (req, res) => {
  let connection;
  // Extraemos los datos del body
  const {
    id_producto,
    id_configuracion,
    codigo_lote,
    fecha_vencimiento,
    costo_lote,
    cantidad_pallets,
    cantidad_bases,
    cantidad_fardos,
    cantidad_botellas,
    id_sucursal, // se usará o por defecto 1
    id_usuario    // se usará o por defecto 1
  } = req.body;

  // Validar que se hayan enviado todos los datos requeridos
  if (
    !id_producto ||
    !id_configuracion ||
    !codigo_lote ||
    !fecha_vencimiento ||
    !costo_lote ||
    cantidad_pallets === undefined ||
    cantidad_bases === undefined ||
    cantidad_fardos === undefined ||
    cantidad_botellas === undefined
  ) {
    return res.status(400).json({ message: "Todos los campos requeridos deben ser proporcionados." });
  }

  try {
    connection = await getConnection();

    // Llamar al procedimiento almacenado para calcular el total de botellas
    await connection.execute(
      "CALL CalcularUnidadesLote(?, ?, ?, ?, ?, @total_botellas)",
      [id_configuracion, cantidad_pallets, cantidad_bases, cantidad_fardos, cantidad_botellas]
    );
    const [rows] = await connection.query("SELECT @total_botellas as total_botellas");
    const total_botellas = rows[0].total_botellas;

    // Insertar el nuevo lote en la tabla Lote
    await connection.execute(
      `INSERT INTO Lote 
         (id_producto, id_configuracion, id_usuario, id_sucursal, codigo_lote, fecha_vencimiento, costo_lote, total_unidades, cantidad_pallets, cantidad_bases, cantidad_fardos, cantidad_botellas)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_producto,
        id_configuracion,
        id_usuario || 1,
        id_sucursal || 1,
        codigo_lote,
        fecha_vencimiento,
        costo_lote,
        total_botellas,
        cantidad_pallets,
        cantidad_bases,
        cantidad_fardos,
        cantidad_botellas
      ]
    );

    // Actualizar el stock: se suma el total calculado a la cantidad disponible
    await connection.execute(
      `INSERT INTO Stock (id_producto, id_sucursal, cantidad_disponible)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE cantidad_disponible = cantidad_disponible + ?`,
      [id_producto, id_sucursal || 1, total_botellas, total_botellas]
    );

    // Registrar el movimiento de stock
    await connection.execute(
      `INSERT INTO Movimiento_Stock (id_producto, id_sucursal, id_usuario, tipo_movimiento, cantidad)
       VALUES (?, ?, ?, 'entrada', ?)`,
      [id_producto, id_sucursal || 1, id_usuario || 1, total_botellas]
    );

    res.status(201).json({ message: "Lote creado exitosamente.", total_botellas });
  } catch (error) {
    console.error("Error al crear el lote:", error);
    res.status(500).json({ message: "Error al crear el lote" });
  } finally {
    if (connection) await connection.end();
  }
};
