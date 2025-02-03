import React from "react";

const SociosDelete = ({ socio, onDelete, disabled }) => {
  return (
    <button 
      onClick={() => onDelete(socio.id_socio)} 
      disabled={disabled}
    >
      Eliminar
    </button>
  );
};

export default SociosDelete;