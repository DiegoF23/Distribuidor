import React from 'react';

const ProveedoresDelete = ({ proveedor, onDelete }) => {
  const handleClick = () => {
    onDelete(proveedor.id_proveedor);
  };

  return <button onClick={handleClick}>Eliminar</button>;
};

export default ProveedoresDelete;