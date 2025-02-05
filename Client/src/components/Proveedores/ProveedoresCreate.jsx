import React, { useState, useEffect } from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';
import axios from 'axios';

const ProveedoresCreate = ({ onAdd, proveedor = null, onEdit }) => {
  const { API_URL } = useApiContext();
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    apellido: '',
    codigo: '',
    email: '',
    telefono: '',
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
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para campos de nombre y apellido: solo letras
    if ((name === 'nombre' || name === 'apellido') && /[^a-zA-Z\s]/.test(value)) {
      return; // Si el valor contiene caracteres no permitidos, no actualiza el estado
    }

    // Validación para el teléfono: solo números
    if (name === 'telefono' && !/^\d*$/.test(value)) {
      return; // Solo números para el teléfono
    }

    setNuevoProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de campos obligatorios
    for (const key in nuevoProveedor) {
      if (nuevoProveedor[key].trim() === '') {
        alert(`El campo ${key.toUpperCase()} es obligatorio`);
        return;
      }
    }

    try {
      if (proveedor) {
        const response = await axios.put(`${API_URL}/proveedores/${proveedor.id_proveedor}`, nuevoProveedor);
        onEdit(response.data);
      } else {
        const response = await axios.post(`${API_URL}/proveedores`, nuevoProveedor);
        onAdd(response.data);
      }
    } catch (error) {
      console.error('Error al guardar el proveedor:', error);
    }

    setNuevoProveedor({ nombre: '', apellido: '', codigo: '', email: '', telefono: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={nuevoProveedor.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={nuevoProveedor.apellido}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={nuevoProveedor.codigo}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={nuevoProveedor.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={nuevoProveedor.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">{proveedor ? 'Guardar Cambios' : 'Agregar'}</button>
    </form>
  );
};

export default ProveedoresCreate;