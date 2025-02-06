import React, { useState } from "react";
import { useProductos } from "../contexts/Productos/ProductosContext";
import CrearProducto from "../components/Productos/CrearProducto";
import EditarProducto from "../components/Productos/EditarProducto";
import { useApiContext } from "../contexts/api/ApiContext";
import '../styles/Pages/Producto.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from "axios";

const Productos = () => {
  const { API_URL } = useApiContext();
  const { productos, loading, error, obtenerProductos } = useProductos();
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProductoCreado = async () => {
    await obtenerProductos();
    setModalOpen(false);
  };

  const handleProductoEditado = async () => {
    await obtenerProductos();
    setProductoEditando(null);
  };

  const handleEliminarProducto = async (id_producto) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/productos/${id_producto}`);
        await obtenerProductos(); // Actualizar la lista de productos
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Productos</h1>

      {productoEditando ? (
        <EditarProducto
          producto={productoEditando}
          onProductoEditado={handleProductoEditado}
          onCancelar={() => setProductoEditando(null)}
        />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock Óptimo</th>
                <th>Stock Mínimo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.nombre}</td>
                  <td>{producto.marca}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.stock_optimo}</td>
                  <td>{producto.stock_minimo}</td>
                  <td>
                    <button onClick={() => setProductoEditando(producto)} style={{color:'var(--color-primary-400)', backgroundColor:'transparent'}} className="action-btn edit-btn">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleEliminarProducto(producto.id_producto)} style={{color:'var(--color-primary-400)', backgroundColor:'transparent'}} className="action-btn delete-btn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => setModalOpen(true)} className="create-btn">
            <FaPlus /> Crear Nuevo Producto
          </button>

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-btn" onClick={() => setModalOpen(false)}>
                  X
                </button>
                <CrearProducto onProductoCreado={handleProductoCreado} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productos;
