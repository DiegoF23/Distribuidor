import React from 'react';

const ClientesDelete = ({ cliente, onDelete }) => {
  const handleClick = () => {
    onDelete(cliente.id_cliente);
  };

  return <button onClick={handleClick}>Eliminar</button>;
};

export default ClientesDelete;