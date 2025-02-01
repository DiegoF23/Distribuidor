import React, { useEffect } from "react";

const LoteForm = ({ lote, setLote, onSubmit, editingLoteId }) => {
  // Si se está editando, puedes cargar el lote seleccionado en el formulario
  useEffect(() => {
    // Aquí podrías cargar los datos del lote a editar si lo manejas a través de props
  }, [editingLoteId]);

  return (
    <div>
      <h2>{editingLoteId ? "Editar Lote" : "Ingresar Lote"}</h2>
      <label>
        Producto:
        <select
          value={lote.producto}
          onChange={(e) => setLote({ ...lote, producto: e.target.value })}
        >
          {/* Asume que tienes una lista de productos o la recibes como prop */}
          <option value="Pepsi 2L">Pepsi 2L</option>
          <option value="Coca-Cola 2L">Coca-Cola 2L</option>
          <option value="Sprite 2L">Sprite 2L</option>
        </select>
      </label>
      <label>
        Pallets:
        <input
          type="number"
          value={lote.pallets}
          onChange={(e) =>
            setLote({ ...lote, pallets: parseInt(e.target.value) || 0 })
          }
        />
      </label>
      <label>
        Bases por pallet:
        <input
          type="number"
          value={lote.basesPorPallet}
          onChange={(e) =>
            setLote({ ...lote, basesPorPallet: parseInt(e.target.value) || 0 })
          }
        />
      </label>
      <label>
        Fardos por base:
        <input
          type="number"
          value={lote.fardosPorBase}
          onChange={(e) =>
            setLote({ ...lote, fardosPorBase: parseInt(e.target.value) || 0 })
          }
        />
      </label>
      <label>
        Botellas por fardo:
        <input
          type="number"
          value={lote.botellasPorFardo}
          onChange={(e) =>
            setLote({ ...lote, botellasPorFardo: parseInt(e.target.value) || 0 })
          }
        />
      </label>
      <button onClick={() => onSubmit(lote)}>
        {editingLoteId ? "Guardar Cambios" : "Agregar Lote"}
      </button>
    </div>
  );
};

export default LoteForm;
