// src/components/Proveedores/ProveedoresCreate.jsx
import React, { useState, useEffect } from "react";
import { useApiContext } from "../../contexts/api/ApiContext";
import axios from "axios";

const ProveedoresCreate = ({ onAdd, proveedor = null, onEdit }) => {
  const { API_URL } = useApiContext();
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    apellido: "",
    codigo: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    if (proveedor) {
      setNuevoProveedor({
        nombre: proveedor.nombre_proveedor,
        apellido: proveedor.apellido_proveedor,
        codigo: proveedor.codigo_proveedor,
        email: proveedor.email_proveedor,
        telefono: proveedor.numero_proveedor,
      });
    } else {
      setNuevoProveedor({
        nombre: "",
        apellido: "",
        codigo: "",
        email: "",
        telefono: "",
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono" && !/^\d*$/.test(value)) return; // solo números
    setNuevoProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in nuevoProveedor) {
      if (String(nuevoProveedor[key]).trim() === "") {
        alert(`El campo ${key.toUpperCase()} es obligatorio`);
        return;
      }
    }

    try {
      if (proveedor) {
        const res = await axios.put(
          `${API_URL}/proveedores/${proveedor.id_proveedor}`,
          nuevoProveedor
        );
        onEdit(res.data);
      } else {
        const res = await axios.post(`${API_URL}/proveedores`, nuevoProveedor);
        onAdd(res.data);
      }
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
    }
  };

  // estilos de inputs/btn locales (look & feel consistente)
  const label = {
    fontSize: 13,
    color: "#475569",
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
  };
  const input = {
    width: "100%",
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "12px 14px",
    outline: "none",
  };
  const grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  };
  const full = { gridColumn: "1 / -1" };
  const actions = {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 8,
  };
  const btn = {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: "var(--color-primary-400)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={grid}>
        <div>
          <label style={label}>Nombre</label>
          <input
            style={input}
            type="text"
            name="nombre"
            value={nuevoProveedor.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={label}>Apellido</label>
          <input
            style={input}
            type="text"
            name="apellido"
            value={nuevoProveedor.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={label}>Código</label>
          <input
            style={input}
            type="text"
            name="codigo"
            value={nuevoProveedor.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={label}>Teléfono</label>
          <input
            style={input}
            type="text"
            name="telefono"
            value={nuevoProveedor.telefono}
            onChange={handleChange}
            required
            placeholder="Ej: 3815550000"
          />
        </div>
        <div style={full}>
          <label style={label}>Email</label>
          <input
            style={input}
            type="email"
            name="email"
            value={nuevoProveedor.email}
            onChange={handleChange}
            required
            placeholder="proveedor@correo.com"
          />
        </div>
      </div>

      <div style={actions}>
        <button type="submit" style={btn}>
          {proveedor ? "Guardar Cambios" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default ProveedoresCreate;
