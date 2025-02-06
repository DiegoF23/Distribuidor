import React, { useState, useEffect } from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';
import axios from 'axios';

const ProveedoresCreate = ({ onAdd, proveedor = null, onEdit, onCancel }) => {
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
    } else {
      // Si no hay proveedor, se limpia el formulario.
      setNuevoProveedor({
        nombre: '',
        apellido: '',
        codigo: '',
        email: '',
        telefono: '',
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para campos de nombre y apellido: solo letras y espacios.
    if ((name === 'nombre' || name === 'apellido') && /[^a-zA-Z\s]/.test(value)) {
      return; // No actualiza el estado si se ingresan caracteres no permitidos.
    }

    // Validación para el teléfono: solo números.
    if (name === 'telefono' && !/^\d*$/.test(value)) {
      return;
    }

    setNuevoProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de campos obligatorios.
    for (const key in nuevoProveedor) {
      if (nuevoProveedor[key].trim() === '') {
        alert(`El campo ${key.toUpperCase()} es obligatorio`);
        return;
      }
    }

    try {
      if (proveedor) {
        const response = await axios.put(
          `${API_URL}/proveedores/${proveedor.id_proveedor}`,
          nuevoProveedor
        );
        onEdit(response.data);
      } else {
        const response = await axios.post(`${API_URL}/proveedores`, nuevoProveedor);
        onAdd(response.data);
      }
    } catch (error) {
      console.error('Error al guardar el proveedor:', error);
    }

    // Limpiar el formulario después de enviar.
    setNuevoProveedor({ nombre: '', apellido: '', codigo: '', email: '', telefono: '' });
  };

  // Función que se ejecuta al cancelar la edición.
  const handleCancel = () => {
    // Se limpia el formulario.
    setNuevoProveedor({ nombre: '', apellido: '', codigo: '', email: '', telefono: '' });
    // Se llama a onCancel para que el componente padre actualice su estado (por ejemplo, deseleccione el proveedor en edición).
    if (typeof onCancel === 'function') {
      onCancel();
    }
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
      {proveedor && (
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ProveedoresCreate;