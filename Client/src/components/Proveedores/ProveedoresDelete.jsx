import React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';

const ProveedoresDelete = ({ proveedor, onDelete }) => {
  const { API_URL } = useApiContext();
  const handleClick = () => {
    onDelete(proveedor.id_proveedor);
  };

  return <button onClick={handleClick}>Eliminar</button>;
};

export default ProveedoresDelete;