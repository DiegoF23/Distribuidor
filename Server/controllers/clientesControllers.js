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

exports.createCliente = async (req, res) => {
    const { nombre_cliente, apellido_cliente, mail_cliente, numero_cliente } = req.body;
    console.log('Datos recibidos:', req.body);

    try {
        const connection = await getConnection();
        const query = `
            INSERT INTO clientes (nombre_cliente, apellido_cliente, mail_cliente, numero_cliente)
            VALUES (?, ?, ?, ?)
        `;
        await connection.execute(query, [nombre_cliente, apellido_cliente, mail_cliente, numero_cliente]);
        connection.release();

        res.status(201).json({ message: "Cliente creado exitosamente" });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ message: "Error al crear el cliente", error });
    }
};

exports.getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM clientes");
        connection.release();
        
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error });
    }
};

exports.updateCliente = async (req, res) => {
    const { id } = req.params; // ID del cliente a actualizar
    const { nombre_cliente, apellido_cliente, mail_cliente, numero_cliente } = req.body;

    try {
        const connection = await getConnection();
        const query = `
            UPDATE clientes
            SET nombre_cliente = ?, apellido_cliente = ?, mail_cliente = ?, numero_cliente = ?
            WHERE id_cliente = ?
        `;
        const [result] = await connection.execute(query, [nombre_cliente, apellido_cliente, mail_cliente, numero_cliente, id]);

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        connection.release();
        res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
};

exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    
    try {
        const connection = await getConnection();
        const query = `DELETE FROM clientes WHERE id_cliente = ?`;
        const [result] = await connection.execute(query, [id]);
        connection.release();
        
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Cliente no encontrado" });
        } else {
            res.status(200).json({ message: "Cliente eliminado exitosamente" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
};