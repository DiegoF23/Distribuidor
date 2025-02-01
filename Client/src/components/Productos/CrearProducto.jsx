import React, { useState } from "react";
import axios from "axios";
import { useApiContext } from "../../contexts/api/ApiContext";
import '../../styles/Default/modal.css'

const CrearProducto = ({ onProductoCreado}) => {
  const { API_URL } = useApiContext();

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [costoSIva, setCostoSIva] = useState(0);
  const [costoCIva, setCostoCIva] = useState(0);
  const [rentabilidad, setRentabilidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [margen, setMargen] = useState(0);
  const [tipoEnvase, setTipoEnvase] = useState("botella");
  const [capacidadMl, setCapacidadMl] = useState(0);
  const [stockOptimo, setStockOptimo] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      marca,
      costo_S_Iva: costoSIva,
      costo_C_Iva: costoCIva,
      rentabilidad,
      precio,
      margen,
      tipo_envase: tipoEnvase,
      capacidad_ml: capacidadMl,
      stock_optimo: stockOptimo,
      stock_minimo: stockMinimo,
    };

    try {
      await axios.post(`${API_URL}/productos`, nuevoProducto);
      // Limpiar el formulario
      setNombre("");
      setMarca("");
      setCostoSIva(0);
      setCostoCIva(0);
      setRentabilidad(0);
      setPrecio(0);
      setMargen(0);
      setTipoEnvase("botella");
      setCapacidadMl(0);
      setStockOptimo(0);
      setStockMinimo(0);
      
      // Notificar al componente padre
      if (onProductoCreado) onProductoCreado();
      
      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Crear Nuevo Producto</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Costo sin IVA"
              type="number"
              value={costoSIva}
              onChange={(e) => setCostoSIva(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Costo con IVA"
              type="number"
              value={costoCIva}
              onChange={(e) => setCostoCIva(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Rentabilidad (%)"
              type="number"
              value={rentabilidad}
              onChange={(e) => setRentabilidad(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Margen (%)"
              type="number"
              value={margen}
              onChange={(e) => setMargen(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <Select
              value={tipoEnvase}
              onChange={(e) => setTipoEnvase(e.target.value)}
              fullWidth
              margin="dense"
            >
              <MenuItem value="botella">Botella</MenuItem>
              <MenuItem value="lata">Lata</MenuItem>
              <MenuItem value="envase_retornable">Envase Retornable</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </Select>
            <TextField
              label="Capacidad (ml)"
              type="number"
              value={capacidadMl}
              onChange={(e) => setCapacidadMl(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Stock Óptimo"
              type="number"
              value={stockOptimo}
              onChange={(e) => setStockOptimo(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Stock Mínimo"
              type="number"
              value={stockMinimo}
              onChange={(e) => setStockMinimo(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <div style={{ marginTop: 20, textAlign: "right" }}>
              <Button onClick={onClose} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 10 }}>
                Crear Producto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CrearProducto;