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

exports.createProveedor = async (req, res) => {
    const { nombre, apellido, codigo, email, telefono } = req.body;
    console.log('Datos recibidos:', req.body);

    try {
        const connection = await getConnection();
        const query = `
            INSERT INTO proveedores (nombre_proveedor, apellido_proveedor, codigo_proveedor, email_proveedor, numero_proveedor)
            VALUES (?, ?, ?, ?, ?)
        `;
        await connection.execute(query, [nombre, apellido, codigo, email, telefono]);
        connection.release();

        res.status(201).json({ message: "Proveedor creado exitosamente" });
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        res.status(500).json({ message: "Error al crear el proveedor", error });
    }
};

exports.getProveedores = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM proveedores");
        connection.release();
        
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proveedores", error });
    }
};

exports.updateProveedor = async (req, res) => {
    const { id } = req.params; // ID del proveedor a actualizar
    const { nombre, apellido, codigo, email, telefono } = req.body;

    try {
        const connection = await getConnection();
        const query = `
            UPDATE proveedores
            SET nombre_proveedor = ?, apellido_proveedor = ?, codigo_proveedor = ?, email_proveedor = ?, numero_proveedor = ?
            WHERE id_proveedor = ?
        `;
        const [result] = await connection.execute(query, [nombre, apellido, codigo, email, telefono, id]);

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        connection.release();
        res.status(200).json({ message: 'Proveedor actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).json({ message: 'Error al actualizar el proveedor', error });
    }
};

exports.deleteProveedor = async (req, res) => {
    const { id } = req.params;
    
    try {
        const connection = await getConnection();
        const query = `DELETE FROM proveedores WHERE id_proveedor = ?`;
        const [result] = await connection.execute(query, [id]);
        connection.release();
        
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Proveedor no encontrado" });
        } else {
            res.status(200).json({ message: "Proveedor eliminado exitosamente" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el proveedor", error });
    }
};