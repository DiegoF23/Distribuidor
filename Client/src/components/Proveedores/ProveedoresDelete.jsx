// src/components/Proveedores/ProveedoresDelete.jsx
import React from "react";
import { useApiContext } from "../../contexts/api/ApiContext";

const ProveedoresDelete = ({ proveedor, onDelete }) => {
  useApiContext(); // mantenemos la firma original por si la necesitas
  const handleClick = () => onDelete(proveedor.id_proveedor);

  return (
    <button className="btn ghost" onClick={handleClick} title="Eliminar">
      Eliminar
    </button>
  );
};

export default ProveedoresDelete;
