import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientesCreate = ({ onAdd, cliente = null, onEdit, API_URL }) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: '',
    apellido_cliente: '',
    mail_cliente: '',
    numero_cliente: '',
  });

  useEffect(() => {
    if (cliente) {
      setNuevoCliente({
        nombre_cliente: cliente.nombre_cliente,
        apellido_cliente: cliente.apellido_cliente,
        mail_cliente: cliente.mail_cliente,
        numero_cliente: cliente.numero_cliente,
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el teléfono (solo números)
    if (name === 'numero_cliente') {
      if (!/^\d*$/.test(value)) return; // Solo números
    }

    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de campos obligatorios
    for (const key in nuevoCliente) {
      if (nuevoCliente[key].trim() === '') {
        alert(`El campo ${key.toUpperCase()} es obligatorio`);
        return;
      }
    }

    try {
      if (cliente) {
        const response = await axios.put(`${API_URL}/clientes/${cliente.id_cliente}`, nuevoCliente);
        onEdit(response.data);  // Llama a la función onEdit para actualizar el cliente
      } else {
        const response = await axios.post(`${API_URL}/clientes`, nuevoCliente);
        onAdd(response.data);  // Llama a la función onAdd para agregar el cliente
      }
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }

    setNuevoCliente({ nombre_cliente: '', apellido_cliente: '', mail_cliente: '', numero_cliente: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre_cliente"
        placeholder="Nombre"
        value={nuevoCliente.nombre_cliente}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellido_cliente"
        placeholder="Apellido"
        value={nuevoCliente.apellido_cliente}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="mail_cliente"
        placeholder="Email"
        value={nuevoCliente.mail_cliente}
        onChange={handleChange}
      />
      <input
        type="text"
        name="numero_cliente"
        placeholder="Teléfono"
        value={nuevoCliente.numero_cliente}
        onChange={handleChange}
        required
      />
      <button type="submit">{cliente ? 'Guardar Cambios' : 'Agregar'}</button>
    </form>
  );
};

export default ClientesCreate;