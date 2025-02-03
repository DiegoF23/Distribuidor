import React, { useState } from "react";
import { useProductos } from "../contexts/Productos/ProductosContext";
import CrearProducto from "../components/Productos/CrearProducto";
import EditarProducto from "../components/Productos/EditarProducto";
import { useApiContext } from "../contexts/api/ApiContext";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Iconos de React Icons
import { toast, ToastContainer } from "react-toastify"; // Notificaciones
import "react-toastify/dist/ReactToastify.css"; // Estilos de las notificaciones

const Productos = () => {
  const { API_URL } = useApiContext();
  const { productos, loading, error, obtenerProductos } = useProductos();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const handleProductoCreado = async () => {
    await obtenerProductos();
    setMostrarFormulario(false);
    toast.success("Producto creado exitosamente!"); // Notificación de éxito
  };

  const handleProductoEditado = async () => {
    await obtenerProductos();
    setProductoEditando(null);
    toast.success("Producto actualizado exitosamente!"); // Notificación de éxito
  };

  const handleEliminarProducto = async (id_producto) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/productos/${id_producto}`);
        await obtenerProductos();
        toast.success("Producto eliminado exitosamente!"); // Notificación de éxito
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        toast.error("Error al eliminar el producto"); // Notificación de error
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando productos...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
      <ToastContainer /> {/* Contenedor de notificaciones */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos</h1>

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left border border-gray-200">Nombre</th>
              <th className="p-4 text-left border border-gray-200">Marca</th>
              <th className="p-4 text-left border border-gray-200">Precio</th>
              <th className="p-4 text-left border border-gray-200">Stock Óptimo</th>
              <th className="p-4 text-left border border-gray-200">Stock Mínimo</th>
              <th className="p-4 text-left border border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id_producto}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 border border-gray-200">{producto.nombre}</td>
                <td className="p-4 border border-gray-200">{producto.marca}</td>
                <td className="p-4 border border-gray-200">${producto.precio}</td>
                <td className="p-4 border border-gray-200">{producto.stock_optimo}</td>
                <td className="p-4 border border-gray-200">{producto.stock_minimo}</td>
                <td className="p-4 border border-gray-200 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
                    onClick={() => setProductoEditando(producto)}
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                    onClick={() => handleEliminarProducto(producto.id_producto)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón flotante para añadir productos */}
      <button
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <FaPlus className="text-2xl" />
      </button>

      {/* Formularios */}
      {mostrarFormulario && (
        <CrearProducto onProductoCreado={handleProductoCreado} />
      )}
      {productoEditando && (
        <EditarProducto
          producto={productoEditando}
          onProductoEditado={handleProductoEditado}
          onCancelar={() => setProductoEditando(null)}
        />
      )}
    </div>
  );
};

export default Productos;