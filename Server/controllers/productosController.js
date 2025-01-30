const { getConnection } = require("../config/DB/db");

// Función para obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  let connection;
  try {
    // Obtener la conexión a la base de datos
    connection = await getConnection();

    // Consulta SQL para obtener todos los productos
    const [rows] = await connection.execute(
      `SELECT id_producto, nombre, marca, costo_S_Iva, costo_C_Iva, rentabilidad, precio, margen, tipo_envase, capacidad_ml, stock_optimo, stock_minimo 
       FROM Producto`
    );

    // Enviar la respuesta con los productos
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  } finally {
    // Cerrar la conexión a la base de datos
    if (connection) await connection.end();
  }
};


// Función para crear un nuevo producto
exports.crearProducto = async (req, res) => {
  let connection;
  const {
    nombre,
    marca,
    costo_S_Iva,
    costo_C_Iva,
    rentabilidad,
    precio,
    margen,
    tipo_envase,
    capacidad_ml,
    stock_optimo,
    stock_minimo,
  } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (
    !nombre ||
    !marca ||
    !costo_S_Iva ||
    !costo_C_Iva ||
    !rentabilidad ||
    !precio ||
    !margen ||
    !tipo_envase ||
    !capacidad_ml ||
    !stock_optimo ||
    !stock_minimo
  ) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    connection = await getConnection();

    // Insertar el nuevo producto en la base de datos
    const [result] = await connection.execute(
      `INSERT INTO Producto (nombre, marca, costo_S_Iva, costo_C_Iva, rentabilidad, precio, margen, tipo_envase, capacidad_ml, stock_optimo, stock_minimo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        marca,
        costo_S_Iva,
        costo_C_Iva,
        rentabilidad,
        precio,
        margen,
        tipo_envase,
        capacidad_ml,
        stock_optimo,
        stock_minimo,
      ]
    );

    // Enviar la respuesta con el ID del producto creado
    res.status(201).json({ id_producto: result.insertId, message: "Producto creado exitosamente." });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  } finally {
    if (connection) await connection.end();
  }
};

exports.eliminarProducto = async (req, res) => {
  let connection;
  const { id_producto } = req.params;

  if (!id_producto) {
    return res.status(400).json({ message: "ID del producto es requerido." });
  }

  try {
    connection = await getConnection();

    // Iniciar una transacción para asegurar la integridad de los datos
    await connection.beginTransaction();

    // Eliminar registros relacionados en Movimiento_Stock
    await connection.execute(
      `DELETE FROM Movimiento_Stock WHERE id_producto = ?`,
      [id_producto]
    );

    // Eliminar registros relacionados en Stock
    await connection.execute(`DELETE FROM Stock WHERE id_producto = ?`, [
      id_producto,
    ]);

    // Eliminar registros relacionados en Lote
    await connection.execute(`DELETE FROM Lote WHERE id_producto = ?`, [
      id_producto,
    ]);

    // Finalmente, eliminar el producto
    await connection.execute(`DELETE FROM Producto WHERE id_producto = ?`, [
      id_producto,
    ]);

    // Confirmar la transacción
    await connection.commit();

    res.status(200).json({ message: "Producto eliminado exitosamente." });
  } catch (error) {
    // Revertir la transacción en caso de error
    if (connection) await connection.rollback();
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  } finally {
    if (connection) await connection.end();
  }
};
// Función para editar un producto
exports.editarProducto = async (req, res) => {
  let connection;
  const { id_producto } = req.params;
  const {
    nombre,
    marca,
    costo_S_Iva,
    costo_C_Iva,
    rentabilidad,
    precio,
    margen,
    tipo_envase,
    capacidad_ml,
    stock_optimo,
    stock_minimo,
  } = req.body;

  if (
    !nombre ||
    !marca ||
    !costo_S_Iva ||
    !costo_C_Iva ||
    !rentabilidad ||
    !precio ||
    !margen ||
    !tipo_envase ||
    !capacidad_ml ||
    !stock_optimo ||
    !stock_minimo
  ) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    connection = await getConnection();

    // Actualizar el producto en la base de datos
    await connection.execute(
      `UPDATE Producto 
       SET nombre = ?, marca = ?, costo_S_Iva = ?, costo_C_Iva = ?, rentabilidad = ?, precio = ?, margen = ?, tipo_envase = ?, capacidad_ml = ?, stock_optimo = ?, stock_minimo = ?
       WHERE id_producto = ?`,
      [
        nombre,
        marca,
        costo_S_Iva,
        costo_C_Iva,
        rentabilidad,
        precio,
        margen,
        tipo_envase,
        capacidad_ml,
        stock_optimo,
        stock_minimo,
        id_producto,
      ]
    );

    res.status(200).json({ message: "Producto actualizado exitosamente." });
  } catch (error) {
    console.error("Error al editar el producto:", error);
    res.status(500).json({ message: "Error al editar el producto" });
  } finally {
    if (connection) await connection.end();
  }
};