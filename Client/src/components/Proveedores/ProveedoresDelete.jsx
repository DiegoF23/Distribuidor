import React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';

const ProveedoresDelete = ({ proveedor, onDelete, disabled }) => {
  const { API_URL } = useApiContext();
  
  const handleClick = () => {
    onDelete(proveedor.id_proveedor);
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      Eliminar
    </button>
  );
};

export default ProveedoresDelete;