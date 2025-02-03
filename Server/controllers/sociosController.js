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


exports.getSocios = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM Socios");
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener socios:", error);
        res.status(500).json({ message: "Error al obtener socios", error });
    }
};


exports.getSocioById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM Socios WHERE id_socio = ?", [id]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: "Socio no encontrado" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el socio:", error);
        res.status(500).json({ message: "Error al obtener el socio", error });
    }
};


exports.createSocio = async (req, res) => {
    const { id_sucursal = 1, nombre, fecha_maxima_participacion, direccion, telefono, mail } = req.body;

    try {
        const connection = await getConnection();
        const query = `
            INSERT INTO Socios (id_sucursal, nombre, fecha_maxima_participacion, direccion, telefono, mail)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(query, [id_sucursal, nombre, fecha_maxima_participacion, direccion, telefono, mail]);
        connection.release();

        res.status(201).json({ message: "Socio creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el socio:", error);
        res.status(500).json({ message: "Error al crear el socio", error });
    }
};


exports.updateSocio = async (req, res) => {
    const { id } = req.params;
    const { id_sucursal, nombre, fecha_maxima_participacion, direccion, telefono, mail } = req.body;

    try {
        const connection = await getConnection();
        const query = `
            UPDATE Socios 
            SET id_sucursal = ?, nombre = ?, fecha_maxima_participacion = ?, direccion = ?, telefono = ?, mail = ?
            WHERE id_socio = ?
        `;
        const [result] = await connection.execute(query, [id_sucursal, nombre, fecha_maxima_participacion, direccion, telefono, mail, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Socio no encontrado" });
        }

        connection.release();
        res.status(200).json({ message: "Socio actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el socio:", error);
        res.status(500).json({ message: "Error al actualizar el socio", error });
    }
};


exports.deleteSocio = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getConnection();
        const query = `DELETE FROM Socios WHERE id_socio = ?`;
        const [result] = await connection.execute(query, [id]);
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Socio no encontrado" });
        }

        res.status(200).json({ message: "Socio eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el socio:", error);
        res.status(500).json({ message: "Error al eliminar el socio", error });
    }
};