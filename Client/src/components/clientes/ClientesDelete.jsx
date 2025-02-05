import React from 'react';

const ClientesDelete = ({ cliente, onDelete, disabled }) => {
  const handleClick = () => {
    onDelete(cliente.id_cliente);
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      Eliminar
    </button>
  );
};

export default ClientesDelete;