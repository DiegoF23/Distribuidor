import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";

const SociosCreateEdit = ({ onAdd, onEdit, onCancel, socio }) => {
  const { API_URL } = useApiContext();
  const [idSucursal, setIdSucursal] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaMaximaParticipacion, setFechaMaximaParticipacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [errors, setErrors] = useState({
    nombre: "",
    telefono: "",
  });

  // Nuevo estado para almacenar las sucursales
  const [sucursales, setSucursales] = useState([]);

  // Llamada a la API para obtener las sucursales disponibles
  useEffect(() => {
    const getSucursales = async () => {
      try {
        const response = await axios.get(`${API_URL}/sucursales`);
        if (Array.isArray(response.data)) {
          setSucursales(response.data);
        } else {
          console.error("La respuesta de sucursales no es un arreglo:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener sucursales:", error);
      }
    };
    getSucursales();
  }, [API_URL]);

  // Cuando se selecciona un socio para editar, se llenan los campos del formulario
  useEffect(() => {
    if (socio) {
      setIdSucursal(socio.id_sucursal || "");
      setNombre(socio.nombre || "");
      setFechaMaximaParticipacion(
        socio.fecha_maxima_participacion?.split("T")[0] || ""
      );
      setDireccion(socio.direccion || "");
      setTelefono(socio.telefono || "");
      setMail(socio.mail || "");
    } else {
      limpiarFormulario();
    }
  }, [socio]);

  const limpiarFormulario = () => {
    setIdSucursal("");
    setNombre("");
    setFechaMaximaParticipacion("");
    setDireccion("");
    setTelefono("");
    setMail("");
    setErrors({
      nombre: "",
      telefono: "",
    });
  };

  const handleNombreChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setNombre(value);
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setTelefono(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idSucursal || isNaN(idSucursal)) {
      alert("El ID de la sucursal debe ser un número válido.");
      return;
    }

    const socioData = {
      id_sucursal: parseInt(idSucursal, 10),
      nombre,
      fecha_maxima_participacion: fechaMaximaParticipacion || null,
      direccion,
      telefono,
      mail,
    };

    try {
      if (socio) {
        await axios.put(`${API_URL}/socios/${socio.id_socio}`, socioData);
        onEdit({ ...socioData, id_socio: socio.id_socio });
      } else {
        const response = await axios.post(`${API_URL}/socios`, socioData);
        onAdd(response.data);
      }
      limpiarFormulario();
    } catch (error) {
      console.error("Error al guardar el socio:", error);
      alert("Ocurrió un error al guardar el socio.");
    }
  };

  const handleCancel = () => {
    limpiarFormulario();
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <div>
      <h2>{socio ? "Editar Socio" : "Agregar Socio"}</h2>
      <form onSubmit={handleSubmit}>
        <label>ID Sucursal:</label>
        {/* Aquí se reemplaza el input por un select */}
        <select
          value={idSucursal}
          onChange={(e) => setIdSucursal(e.target.value)}
          required
        >
          <option value="">Seleccione una sucursal</option>
          {sucursales.map((sucursal) => (
            <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
              {sucursal.nombre}
            </option>
          ))}
        </select>

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          required
        />

        <label>Fecha Máxima Participación:</label>
        <input
          type="date"
          value={fechaMaximaParticipacion}
          onChange={(e) => setFechaMaximaParticipacion(e.target.value)}
        />

        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
        />

        <label>Email:</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <button type="submit">{socio ? "Actualizar" : "Agregar"}</button>
        {socio && (
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default SociosCreateEdit;