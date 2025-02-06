import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaPlus, FaEdit } from 'react-icons/fa';
import ProveedoresDelete from './ProveedoresDelete';
import ProveedoresCreate from './ProveedoresCreate';
import { useApiContext } from '../../contexts/api/ApiContext';

const MainProveedores = () => {
  const { API_URL } = useApiContext();
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEdit, setProveedorEdit] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

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
    getProveedores();
  }, [API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/proveedores/${id}`);
      setProveedores((prevProveedores) =>
        prevProveedores.filter((proveedor) => proveedor.id_proveedor !== id)
      );
      alert('Se eliminó el proveedor correctamente');
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  const handleAdd = (nuevoProveedor) => {
    setProveedores((prevProveedores) => [...prevProveedores, nuevoProveedor]);
    alert('Proveedor agregado correctamente');
    getProveedores();
    setShowModal(false); // Cerrar el modal después de agregar
  };

  const handleUpdate = (proveedorActualizado) => {
    setProveedores((prevProveedores) =>
      prevProveedores.map((proveedor) =>
        proveedor.id_proveedor === proveedorActualizado.id_proveedor
          ? proveedorActualizado
          : proveedor
      )
    );
    setProveedorEdit(null);
    alert('Proveedor actualizado correctamente');
    getProveedores();
    setShowModal(false); // Cerrar el modal después de editar
  };

  const handleEdit = (proveedor) => {
    setProveedorEdit(proveedor);
    setShowModal(true); // Mostrar el modal para editar
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
                <button onClick={() => handleEdit(proveedor)} style={{color:'var(--color-primary-400)', backgroundColor:'transparent'}}>
                  <FaEdit /> 
                </button>
                <button onClick={() => handleWhatsAppClick(proveedor.numero_proveedor)} style={{color:'var(--color-primary-400)', backgroundColor:'transparent'}}>
                  <FaWhatsapp /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para abrir el modal */}
      <button className="create-btn" onClick={() => setShowModal(true)}>
        <FaPlus /> Crear Nuevo Proveedor
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              X
            </button>
            <ProveedoresCreate
              onAdd={handleAdd}
              onEdit={handleUpdate}
              proveedor={proveedorEdit}
              API_URL={API_URL}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainProveedores;
