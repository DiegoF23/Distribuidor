import React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';
import { FaTrash } from 'react-icons/fa';

const ProveedoresDelete = ({ proveedor, onDelete }) => {
  const { API_URL } = useApiContext();
  const handleClick = () => {
    onDelete(proveedor.id_proveedor);
  };

  return <button onClick={handleClick} style={{color:'var(--color-primary-400)', backgroundColor:'transparent'}}><FaTrash/></button>;
};

export default ProveedoresDelete;