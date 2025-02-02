import React, { useState } from "react";
import MainLote from '../components/Lotes/MainLote'
import CrearLote from "../components/Lotes/CrearLote";
import { ProductosProvider } from '../contexts/Productos/ProductosContext';
import { StockProvider } from '../contexts/Stock/StockContext';

const Lotes = () => {   
    const [mostrarCrear, setMostrarCrear] = useState(false);
  const [refreshLotes, setRefreshLotes] = useState(false);
  const idSucursal = 1; // Por ejemplo, la sucursal 1

  const handleLoteCreado = () => {
    setMostrarCrear(false);
    setRefreshLotes(!refreshLotes); // Cambio para forzar recarga en MainLote
  };
  return (
    <div>
        <ProductosProvider>
        <StockProvider>
          <div>
            <button onClick={() => setMostrarCrear(!mostrarCrear)}>
              {mostrarCrear ? "Ver Lista de Lotes" : "Crear Nuevo Lote"}
            </button>
            {mostrarCrear ? (
              <CrearLote idSucursal={idSucursal} onLoteCreado={handleLoteCreado} />
            ) : (
              <MainLote idSucursal={idSucursal} key={refreshLotes} />
            )}
          </div>
        </StockProvider>
      </ProductosProvider>
    </div>
  )
}

export default Lotes