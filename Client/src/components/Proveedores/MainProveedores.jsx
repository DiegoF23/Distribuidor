import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import ProveedoresDelete from './ProveedoresDelete';
import ProveedoresCreate from './ProveedoresCreate';

const MainProveedores = ({ API_URL }) => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEdit, setProveedorEdit] = useState(null);

  // Llamada a la API para obtener proveedores
  const getProveedores = async () => {
    try {
      const response = await axios.get(`${API_URL}/proveedores`);
      if (Array.isArray(response.data)) {
        setProveedores(response.data);
      } else {
        console.error('La respuesta del servidor no es un arreglo:', response.data);
        setProveedores([]);
      }
    } catch (error) {
      console.error('Error al traer los proveedores:', error);
    }
  };

  useEffect(() => {
    getProveedores(); // Llamada inicial para obtener los proveedores
  }, [API_URL]);

  // Función que maneja la eliminación de un proveedor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/proveedores/${id}`);
      // Eliminar de la lista sin recargar
      setProveedores((prevProveedores) =>
        prevProveedores.filter((proveedor) => proveedor.id_proveedor !== id)
      );
      alert("Se eliminó el proveedor correctamente")
      console.log('Proveedor eliminado correctamente');
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(`El proveedor con ID ${id} ya no existe.`);
      } else {
        console.error('Error al eliminar el proveedor:', error);
      }
    }
  };

  const handleAdd = (nuevoProveedor) => {
    setProveedores((prevProveedores) => [...prevProveedores, nuevoProveedor]);
    alert('Proveedor agregado correctamente');
    getProveedores(); // Vuelve a cargar la lista después de agregar
  };

  const handleUpdate = (proveedorActualizado) => {
    setProveedores((prevProveedores) =>
      prevProveedores.map((proveedor) =>
        proveedor.id_proveedor === proveedorActualizado.id_proveedor ? proveedorActualizado : proveedor
      )
    );
    setProveedorEdit(null);
    alert('Proveedor actualizado correctamente');
    getProveedores(); // Vuelve a cargar la lista después de editar
  };

  const handleEdit = (proveedor) => {
    setProveedorEdit(proveedor);
  };

  const handleWhatsAppClick = (numero) => {
    window.open(`https://wa.me/${numero}`, '_blank');
  };

  return (
    <div>
      <h1>Lista de Proveedores</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Código</th>
            <th>Email</th>
            <th>Número de Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id_proveedor}>
              <td>{proveedor.nombre_proveedor}</td>
              <td>{proveedor.apellido_proveedor}</td>
              <td>{proveedor.codigo_proveedor}</td>
              <td>{proveedor.email_proveedor}</td>
              <td>{proveedor.numero_proveedor}</td>
              <td>
                <ProveedoresDelete 
                  proveedor={proveedor} 
                  API_URL={API_URL} 
                  onDelete={handleDelete} 
                />
                <button onClick={() => handleEdit(proveedor)}>Editar</button>
                <button onClick={() => handleWhatsAppClick(proveedor.numero_proveedor)}>
                  <FaWhatsapp /> WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProveedoresCreate
        onAdd={handleAdd}
        onEdit={handleUpdate}
        proveedor={proveedorEdit}
        API_URL={API_URL}
      />
    </div>
  );
};

export default MainProveedores;