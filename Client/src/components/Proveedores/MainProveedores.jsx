// src/components/Proveedores/MainProveedores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import ProveedoresDelete from "./ProveedoresDelete";
import ProveedoresCreate from "./ProveedoresCreate";
import { useApiContext } from "../../contexts/api/ApiContext";
import "../../styles/style.css";

const BANNER_IMG =
  "https://thelogisticsworld.com/wp-content/uploads/2020/09/proveedores-e1663621176409.jpeg";

const MainProveedores = () => {
  const { API_URL } = useApiContext();
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEdit, setProveedorEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getProveedores = async () => {
    try {
      const res = await axios.get(`${API_URL}/proveedores`);
      setProveedores(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al traer los proveedores:", error);
    }
  };

  useEffect(() => {
    getProveedores();
  }, [API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/proveedores/${id}`);
      setProveedores((p) => p.filter((pr) => pr.id_proveedor !== id));
      alert("Se eliminó el proveedor correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = (nuevo) => {
    setProveedores((p) => [...p, nuevo]);
    setShowForm(false);
    getProveedores();
  };

  const handleUpdate = (upd) => {
    setProveedores((p) =>
      p.map((x) => (x.id_proveedor === upd.id_proveedor ? upd : x))
    );
    setProveedorEdit(null);
    setShowForm(false);
    getProveedores();
  };

  const handleEdit = (prov) => {
    setProveedorEdit(prov);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = (n) => window.open(`https://wa.me/${n}`, "_blank");

  // estilos locales
  const grid = {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 20,
    alignItems: "start",
  };
  const card = {
    background: "#fff",
    border: "1px solid #e6ebf1",
    borderRadius: 16,
    boxShadow: "0 10px 24px rgba(15,23,42,.06)",
  };
  const banner = {
    ...card,
    minHeight: 420,
    position: "relative",
    overflow: "hidden",
    background: `url(${BANNER_IMG}) center/cover no-repeat`,
  };
  const overlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(2,6,23,.12) 0%, rgba(2,6,23,.55) 100%)",
  };
  const caption = {
    position: "absolute",
    left: 16,
    bottom: 14,
    color: "#fff",
    fontWeight: 800,
    textShadow: "0 2px 10px rgba(0,0,0,.35)",
  };
  const iconBtn = {
    width: 42,
    height: 42,
    border: "none",
    borderRadius: 12,
    background: "var(--color-primary-400)",
    color: "#fff",
    fontSize: 26,
    fontWeight: 800,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(56,97,251,.18)",
  };

  return (
    <div className="container-page">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          aria-label={showForm ? "Cerrar formulario" : "Nuevo proveedor"}
          onClick={() => setShowForm((s) => !s)}
          style={iconBtn}
          title={showForm ? "Cerrar" : "Nuevo proveedor"}
        >
          {showForm ? "×" : "+"}
        </button>
        <h1 style={{ margin: 0, fontSize: 22 }}>Proveedores</h1>
      </div>

      <div style={grid} className="mt-3">
        {/* Columna principal */}
        <section>
          {showForm && (
            <div style={{ ...card, padding: 16, marginBottom: 16 }}>
              {/* sin título, sólo el formulario */}
              <ProveedoresCreate
                onAdd={handleAdd}
                onEdit={handleUpdate}
                proveedor={proveedorEdit}
              />
            </div>
          )}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Código</th>
                  <th>Email</th>
                  <th>Número</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((p) => (
                  <tr key={p.id_proveedor}>
                    <td>{p.nombre_proveedor}</td>
                    <td>{p.apellido_proveedor}</td>
                    <td>{p.codigo_proveedor}</td>
                    <td>{p.email_proveedor}</td>
                    <td>{p.numero_proveedor}</td>
                    <td>
                      <div className="actions">
                        <ProveedoresDelete
                          proveedor={p}
                          onDelete={handleDelete}
                        />
                        <button
                          className="btn ghost"
                          onClick={() => handleEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleWhatsAppClick(p.numero_proveedor)}
                          title="Enviar WhatsApp"
                        >
                          <FaWhatsapp /> WhatsApp
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Banner lateral */}
        <aside style={banner} aria-label="Relación con proveedores">
          <div style={overlay} />
          <div style={caption}>Red de Proveedores · Logística</div>
        </aside>
      </div>
    </div>
  );
};

export default MainProveedores;
