import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import ClientesDelete from './ClientesDelete';
import ClientesCreate from './ClientesCreate';
import {useApiContext} from '../../contexts/api/ApiContext'

const MainClientes = ({}) => {
  const { API_URL } = useApiContext();
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);

  // Llamada a la API para obtener clientes
  const getClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      if (Array.isArray(response.data)) {
        setClientes(response.data);
      } else {
        console.error('La respuesta del servidor no es un arreglo:', response.data);
        setClientes([]);
      }
    } catch (error) {
      console.error('Error al traer los clientes:', error);
    }
  };

  useEffect(() => {
    getClientes(); // Llamada inicial para obtener los clientes
  }, [API_URL]);

  // Función que maneja la eliminación de un cliente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`);
      // Eliminar de la lista sin recargar
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id_cliente !== id)
      );
      alert("Se eliminó el cliente correctamente")
      console.log('Cliente eliminado correctamente');
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(`El cliente con ID ${id} ya no existe.`);
      } else {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  const handleAdd = (nuevoCliente) => {
    setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
    alert('Cliente agregado correctamente');
    getClientes();
  };

  const handleUpdate = (clienteActualizado) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.id_cliente === clienteActualizado.id_cliente ? clienteActualizado : cliente
      )
    );
    setClienteEdit(null);
    alert('Cliente actualizado correctamente');
    getClientes();
  };

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
  };

  const handleWhatsAppClick = (numero) => {
    window.open(`https://wa.me/${numero}`, '_blank');
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Número de Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.nombre_cliente}</td>
              <td>{cliente.apellido_cliente}</td>
              <td>{cliente.mail_cliente}</td>
              <td>{cliente.numero_cliente}</td>
              <td>
                <ClientesDelete 
                  cliente={cliente} 
                  API_URL={API_URL} 
                  onDelete={handleDelete} 
                />
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleWhatsAppClick(cliente.numero_cliente)}>
                  <FaWhatsapp /> WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClientesCreate
        onAdd={handleAdd}
        onEdit={handleUpdate}
        cliente={clienteEdit}
        API_URL={API_URL}
      />
    </div>
  );
};

export default MainClientes;