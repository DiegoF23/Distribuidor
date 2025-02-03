import React, { useEffect, useState } from "react";
import axios from "axios";
import SociosDelete from "./SociosDelete";
import SociosCreateEdit from "./SociosCreateEdit";
import { useApiContext } from "../../contexts/api/ApiContext";

const MainSocios = () => {
  const { API_URL } = useApiContext();
  const [socios, setSocios] = useState([]);
  const [socioEdit, setSocioEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getSocios();
  }, [API_URL]);

  const getSocios = async () => {
    try {
      const response = await axios.get(`${API_URL}/socios`);
      if (Array.isArray(response.data)) {
        setSocios(response.data);
      } else {
        console.error("La respuesta del servidor no es un arreglo:", response.data);
        setSocios([]);
      }
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este socio?")) return;

    try {
      await axios.delete(`${API_URL}/socios/${id}`);
      setSocios((prevSocios) => prevSocios.filter((socio) => socio.id_socio !== id));
      alert("Socio eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el socio:", error);
      alert("No se pudo eliminar el socio.");
    }
  };

  const handleAdd = (nuevoSocio) => {
    setSocios((prevSocios) => [...prevSocios, nuevoSocio]);
    alert("Socio agregado correctamente");
    getSocios();
  };

  const handleUpdate = (socioActualizado) => {
    setSocios((prevSocios) =>
      prevSocios.map((socio) => (socio.id_socio === socioActualizado.id_socio ? socioActualizado : socio))
    );
    setSocioEdit(null);
    setIsEditing(false);
    alert("Socio actualizado correctamente");
    getSocios();
  };

  const handleEdit = (socio) => {
    setSocioEdit(socio);
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Lista de Socios</h1>
      <table>
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>Nombre</th>
            <th>Fecha Máxima Participación</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((socio) => (
            <tr key={socio.id_socio}>
              <td>{socio.id_sucursal}</td>
              <td>{socio.nombre}</td>
              <td>{socio.fecha_maxima_participacion?.split("T")[0] || "Sin fecha"}</td>
              <td>{socio.direccion}</td>
              <td>{socio.telefono}</td>
              <td>{socio.mail}</td>
              <td>
                <SociosDelete
                  socio={socio}
                  onDelete={handleDelete}
                  disabled={isEditing}
                />
                <button onClick={() => handleEdit(socio)} disabled={isEditing}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SociosCreateEdit onAdd={handleAdd} onEdit={handleUpdate} socio={socioEdit} />
    </div>
  );
};

export default MainSocios;