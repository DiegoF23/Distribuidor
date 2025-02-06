const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const getConnection = async () => {
  const pool = mysql.createPool(dbConfig);
  return pool.getConnection();
};

exports.getSucursales = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM Sucursal");
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener sucursales:", error);
    res.status(500).json({ message: "Error al obtener sucursales", error });
  }
};

exports.getSucursalById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM Sucursal WHERE id_sucursal = ?", [id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "Sucursal no encontrada" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la sucursal:", error);
    res.status(500).json({ message: "Error al obtener la sucursal", error });
  }
};

exports.createSucursal = async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  try {
    const connection = await getConnection();
    const query = "INSERT INTO Sucursal (nombre, direccion, telefono) VALUES (?, ?, ?)";
    await connection.execute(query, [nombre, direccion, telefono]);
    connection.release();

    res.status(201).json({ message: "Sucursal creada exitosamente" });
  } catch (error) {
    console.error("Error al crear la sucursal:", error);
    res.status(500).json({ message: "Error al crear la sucursal", error });
  }
};

exports.updateSucursal = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;

  try {
    const connection = await getConnection();
    const query = "UPDATE Sucursal SET nombre = ?, direccion = ?, telefono = ? WHERE id_sucursal = ?";
    const [result] = await connection.execute(query, [nombre, direccion, telefono, id]);

    if (result.affectedRows === 0) {
      connection.release();
      return res.status(404).json({ message: "Sucursal no encontrada" });
    }

    connection.release();
    res.status(200).json({ message: "Sucursal actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la sucursal:", error);
    res.status(500).json({ message: "Error al actualizar la sucursal", error });
  }
};

exports.deleteSucursal = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const query = "DELETE FROM Sucursal WHERE id_sucursal = ?";
    const [result] = await connection.execute(query, [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sucursal no encontrada" });
    }

    res.status(200).json({ message: "Sucursal eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error);
    res.status(500).json({ message: "Error al eliminar la sucursal", error });
  }
};