import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import ClientesDelete from './ClientesDelete';
import ClientesCreate from './ClientesCreate';
import {useApiContext} from '../../contexts/api/ApiContext';
import '../../styles/style.css';

const MainClientes = () => {
  const { API_URL } = useApiContext();
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);

  const getClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      setClientes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al traer los clientes:', error);
    }
  };

  useEffect(() => { getClientes(); }, [API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`);
      setClientes((prev) => prev.filter((c) => c.id_cliente !== id));
      alert("Se eliminó el cliente correctamente");
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleAdd = (nuevo) => { setClientes((p) => [...p, nuevo]); getClientes(); };
  const handleUpdate = (upd) => { setClientes((p) => p.map(c => c.id_cliente === upd.id_cliente ? upd : c)); setClienteEdit(null); getClientes(); };
  const handleEdit = (c) => setClienteEdit(c);
  const handleWhatsAppClick = (n) => window.open(`https://wa.me/${n}`, '_blank');

  return (
    <div className="container-page">
      <h1 className="center">Lista de Clientes</h1>

      <div className="table-wrap mt-3">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Número</th>
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
                  <div className="actions">
                    <ClientesDelete cliente={cliente} onDelete={handleDelete} />
                    <button className="btn ghost" onClick={() => handleEdit(cliente)}>Editar</button>
                    <button className="btn" onClick={() => handleWhatsAppClick(cliente.numero_cliente)}>
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-3">
        <h3 style={{marginTop:0}}>{clienteEdit ? "Editar Cliente" : "Crear Cliente"}</h3>
        <ClientesCreate onAdd={handleAdd} onEdit={handleUpdate} cliente={clienteEdit} />
      </div>
    </div>
  );
};

export default MainClientes;
