import React from "react";

const LoteList = ({ lotes, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lotes Agregados</h2>
      {lotes.length === 0 ? (
        <p>No hay lotes agregados.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Pallets</th>
              <th>Bases</th>
              <th>Fardos</th>
              <th>Botellas</th>
              <th>Total Botellas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((l) => (
              <tr key={l.id}>
                <td>{l.producto}</td>
                <td>{l.pallets}</td>
                <td>{l.basesPorPallet}</td>
                <td>{l.fardosPorBase}</td>
                <td>{l.botellasPorFardo}</td>
                <td>{l.total}</td>
                <td>
                  <button onClick={() => onEdit(l.id)}>Editar</button>
                  <button onClick={() => onDelete(l.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoteList;
