create database if not exists distribuidor;
use distribuidor;

-- 🔴 Eliminar tablas si existen
DROP TABLE IF EXISTS Movimiento_Stock;
DROP TABLE IF EXISTS Stock;
DROP TABLE IF EXISTS Lote;
DROP TABLE IF EXISTS Lote_Configuracion;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Usuario_Sucursal;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Sucursal;
DROP TABLE IF EXISTS Rol;

-- 🔴 Eliminar procedimientos y funciones si existen
DROP PROCEDURE IF EXISTS CalcularUnidadesLote;
DROP FUNCTION IF EXISTS EstadoStock;

-- 🟢 Tabla de roles
CREATE TABLE Rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

-- 🟢 Tabla de sucursales
CREATE TABLE Sucursal (
    id_sucursal INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15)
);

-- 🟢 Tabla de usuarios
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_rol INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

-- 🟢 Tabla de relación entre usuarios y sucursales
CREATE TABLE Usuario_Sucursal (
    id_usuario INT NOT NULL,
    id_sucursal INT NOT NULL,
    PRIMARY KEY (id_usuario, id_sucursal),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal(id_sucursal)
);

-- 🟢 Tabla de productos
CREATE TABLE Producto (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    costo_S_Iva DECIMAL(10, 2) NOT NULL,
    costo_C_Iva DECIMAL(10, 2) NOT NULL,
    rentabilidad DECIMAL(5, 2) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    margen DECIMAL(5, 2) NOT NULL,
    tipo_envase ENUM('botella', 'lata', 'envase_retornable', 'otro') NOT NULL,
    capacidad_ml INT,
    stock_optimo INT NOT NULL,
    stock_minimo INT NOT NULL
);

-- 🟢 Tabla de stock
CREATE TABLE Stock (
    id_stock INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_sucursal INT NOT NULL,
    cantidad_disponible INT NOT NULL DEFAULT 0,
    ultima_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal(id_sucursal)
);
ALTER TABLE Stock
ADD CONSTRAINT unique_producto_sucursal UNIQUE (id_producto, id_sucursal);
-- 🟢 Tabla de configuraciones de lote
CREATE TABLE Lote_Configuracion (
    id_configuracion INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(255) NOT NULL,
    cantidad_pallets INT NOT NULL,
    bases_por_pallet INT NOT NULL,
    fardos_por_base INT NOT NULL,
    botellas_por_fardo INT NOT NULL
);

-- 🟢 Tabla de lotes con detalles de ingreso
CREATE TABLE Lote (
    id_lote INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_configuracion INT NOT NULL,
    id_usuario INT NOT NULL,
    codigo_lote VARCHAR(50) UNIQUE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    costo_lote DECIMAL(10, 2) NOT NULL,
    total_unidades INT NOT NULL,
    cantidad_pallets INT NOT NULL DEFAULT 0,
    cantidad_bases INT NOT NULL DEFAULT 0,
    cantidad_fardos INT NOT NULL DEFAULT 0,
    cantidad_botellas INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_configuracion) REFERENCES Lote_Configuracion(id_configuracion),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- 🟢 Tabla de movimientos de stock
CREATE TABLE Movimiento_Stock (
    id_movimiento INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_sucursal INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal(id_sucursal),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- 🟢 Procedimiento para calcular unidades en un lote
DELIMITER //

CREATE PROCEDURE CalcularUnidadesLote(
    IN p_id_configuracion INT,
    IN p_cantidad_pallets INT,
    IN p_cantidad_bases INT,
    IN p_cantidad_fardos INT,
    IN p_cantidad_botellas INT,
    OUT p_total_botellas INT
)
BEGIN
    DECLARE v_pallets INT;
    DECLARE v_bases INT;
    DECLARE v_fardos INT;
    DECLARE v_botellas INT;

    -- Obtener la configuración del lote
    SELECT cantidad_pallets, bases_por_pallet, fardos_por_base, botellas_por_fardo
    INTO v_pallets, v_bases, v_fardos, v_botellas
    FROM Lote_Configuracion
    WHERE id_configuracion = p_id_configuracion;

    -- Calcular el total de botellas basado en la jerarquía establecida
    SET p_total_botellas = 
        (p_cantidad_pallets * v_bases * v_fardos * v_botellas) +
        (p_cantidad_bases * v_fardos * v_botellas) +
        (p_cantidad_fardos * v_botellas) +
        p_cantidad_botellas;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION EstadoStock(p_id_producto INT, p_id_sucursal INT) 
RETURNS VARCHAR(50) 
DETERMINISTIC
BEGIN
    DECLARE estado VARCHAR(50);
    DECLARE stock_actual INT;
    DECLARE stock_minimo INT;
    DECLARE stock_optimo INT;

    -- Obtener el stock actual, stock mínimo y stock óptimo para el producto y sucursal específicos
    SELECT st.cantidad_disponible, p.stock_minimo, p.stock_optimo 
    INTO stock_actual, stock_minimo, stock_optimo 
    FROM Stock st
    JOIN Producto p ON st.id_producto = p.id_producto
    WHERE st.id_producto = p_id_producto AND st.id_sucursal = p_id_sucursal
    LIMIT 1;  -- Asegurar que solo se devuelva una fila

    -- Determinar el estado del stock
    IF stock_actual < stock_minimo THEN
        SET estado = '🔴 Stock Bajo';
    ELSEIF stock_actual BETWEEN stock_minimo AND stock_optimo THEN
        SET estado = '🟢 Stock Óptimo';
    ELSE
        SET estado = '🟡 Stock Alto';
    END IF;

    RETURN estado;
END //

DELIMITER ;

-- 🟢 Insertar roles
INSERT INTO Rol (nombre, descripcion) VALUES 
('Dueño', 'Dueño de la empresa con acceso total'),
('Gerente', 'Gerente de sucursal con acceso a gestión de stock y personal'),
('Repositor', 'Encargado de reposición de stock');

-- 🟢 Insertar sucursales
INSERT INTO Sucursal (nombre, direccion, telefono) VALUES 
('Sucursal Central', 'Calle Principal 123', '123456789'),
('Sucursal Norte', 'Avenida Norte 456', '987654321');

-- 🟢 Insertar usuarios
INSERT INTO Usuario (id_rol, nombre, apellido, email, contraseña) VALUES 
(1, 'Juan', 'Pérez', 'juan@empresa.com', 'contraseña1'),
(2, 'Ana', 'Gómez', 'ana@empresa.com', 'contraseña2'),
(3, 'Carlos', 'López', 'carlos@empresa.com', 'contraseña3');

-- 🟢 Asignar usuarios a sucursales
INSERT INTO Usuario_Sucursal (id_usuario, id_sucursal) VALUES 
(1, 1),  -- Juan Pérez (Dueño) en Sucursal Central
(2, 1),  -- Ana Gómez (Gerente) en Sucursal Central
(3, 2);  -- Carlos López (Repositor) en Sucursal Norte

-- 🟢 Insertar configuraciones de lote
INSERT INTO Lote_Configuracion (descripcion, cantidad_pallets, bases_por_pallet, fardos_por_base, botellas_por_fardo)
VALUES 
('Estandar (1 pallet = 3 bases, 1 base = 4 fardos, 1 fardo = 8 botellas)', 1, 3, 4, 8);

-- 🟢 Insertar un producto (Coca-Cola)
INSERT INTO Producto (nombre, marca, costo_S_Iva, costo_C_Iva, rentabilidad, precio, margen, tipo_envase, capacidad_ml, stock_optimo, stock_minimo)
VALUES ('Coca-Cola', 'Coca-Cola', 50.00, 60.50, 20.00, 72.60, 20.00, 'botella', 1000, 200, 100);

-- 🟢 Insertar un lote de Coca-Cola (usuario: Ana Gómez, sucursal: Central)
SET @id_configuracion = 1;
SET @cantidad_pallets = 2;
SET @cantidad_bases = 1;
SET @cantidad_fardos = 0;
SET @cantidad_botellas = 5;

CALL CalcularUnidadesLote(@id_configuracion, @cantidad_pallets, @cantidad_bases, @cantidad_fardos, @cantidad_botellas, @total_botellas);

INSERT INTO Lote (id_producto, id_configuracion, id_usuario, codigo_lote, fecha_vencimiento, costo_lote, total_unidades, cantidad_pallets, cantidad_bases, cantidad_fardos, cantidad_botellas)
VALUES (1, @id_configuracion, 2, 'L20240302-D', '2025-02-20', 62000.00, @total_botellas, @cantidad_pallets, @cantidad_bases, @cantidad_fardos, @cantidad_botellas);

-- Actualizar el stock en la sucursal 1 (Sucursal Central)
INSERT INTO Stock (id_producto, id_sucursal, cantidad_disponible)
VALUES (1, 1, @total_botellas)
ON DUPLICATE KEY UPDATE cantidad_disponible = cantidad_disponible + @total_botellas;

-- Registrar el movimiento de stock en la sucursal 1
INSERT INTO Movimiento_Stock (id_producto, id_sucursal, id_usuario, tipo_movimiento, cantidad)
VALUES (1, 1, 2, 'entrada', @total_botellas);

-- 🟢 Insertar un nuevo producto (Pepsi 2L)
INSERT INTO Producto (nombre, marca, costo_S_Iva, costo_C_Iva, rentabilidad, precio, margen, tipo_envase, capacidad_ml, stock_optimo, stock_minimo)
VALUES ('Pepsi', 'PepsiCo', 40.00, 48.40, 20.00, 58.08, 20.00, 'botella', 2000, 150, 75);

-- Obtener el ID del nuevo producto
SET @id_pepsi = LAST_INSERT_ID();

-- Insertar un lote de Pepsi (usuario: Carlos López, sucursal: Norte)
SET @cantidad_pallets = 1;  -- Insertamos 1 pallet
CALL CalcularUnidadesLote(@id_configuracion, @cantidad_pallets, @cantidad_bases, @cantidad_fardos, @cantidad_botellas, @total_botellas);

INSERT INTO Lote (id_producto, id_configuracion, id_usuario, codigo_lote, fecha_vencimiento, costo_lote, total_unidades, cantidad_pallets, cantidad_bases, cantidad_fardos, cantidad_botellas)
VALUES (@id_pepsi, @id_configuracion, 3, 'L20240310-B', '2025-04-10', 31000.00, @total_botellas, @cantidad_pallets, @cantidad_bases, @cantidad_fardos, @cantidad_botellas);

-- Actualizar el stock en la sucursal 2 (Sucursal Norte)
INSERT INTO Stock (id_producto, id_sucursal, cantidad_disponible)
VALUES (@id_pepsi, 2, @total_botellas)
ON DUPLICATE KEY UPDATE cantidad_disponible = cantidad_disponible + @total_botellas;

-- Registrar el movimiento de stock en la sucursal 2
INSERT INTO Movimiento_Stock (id_producto, id_sucursal, id_usuario, tipo_movimiento, cantidad)
VALUES (@id_pepsi, 2, 3, 'entrada', @total_botellas);







-- Definir la configuración del lote
SET @id_configuracion = 1;  -- Configuración estándar: 1 pallet = 3 bases, 1 base = 4 fardos, 1 fardo = 8 botellas
SET @cantidad_pallets = 4;  -- Insertamos 4 pallets
SET @cantidad_bases = 0;    -- No se ingresan bases directamente
SET @cantidad_fardos = 0;   -- No se ingresan fardos directamente
SET @cantidad_botellas = 0; -- No se ingresan botellas sueltas

-- Calcular la cantidad total de botellas para 4 pallets
CALL CalcularUnidadesLote(@id_configuracion, @cantidad_pallets, @cantidad_bases, @cantidad_fardos, @cantidad_botellas, @total_botellas);

-- Insertar el nuevo lote de Coca-Cola con referencia al usuario y sucursal
INSERT INTO Lote (id_producto, id_configuracion, id_usuario, codigo_lote, fecha_vencimiento, costo_lote, total_unidades, cantidad_pallets, cantidad_bases, cantidad_fardos, cantidad_botellas)
VALUES (
    1,                          -- id_producto: Coca-Cola
    @id_configuracion,          -- id_configuracion: Configuración estándar
    2,                          -- id_usuario: Ana Gómez (Gerente)
    'L20240315-C',              -- Código de lote único
    '2025-05-20',               -- Fecha de vencimiento
    124000.00,                  -- Costo del lote
    @total_botellas,            -- Total de botellas calculado
    @cantidad_pallets,          -- Cantidad de pallets
    @cantidad_bases,            -- Cantidad de bases
    @cantidad_fardos,           -- Cantidad de fardos
    @cantidad_botellas          -- Cantidad de botellas
);

-- Actualizar el stock en la sucursal 1 (Sucursal Central)
INSERT INTO Stock (id_producto, id_sucursal, cantidad_disponible)
VALUES (1, 1, @total_botellas)
ON DUPLICATE KEY UPDATE cantidad_disponible = cantidad_disponible + @total_botellas;

-- Registrar el movimiento de stock en la sucursal 1
INSERT INTO Movimiento_Stock (id_producto, id_sucursal, id_usuario, tipo_movimiento, cantidad)
VALUES (1, 1, 2, 'entrada', @total_botellas);



-- 📌 Consultas predefinidas

-- 1. Ver lotes registrados con sus configuraciones y usuario que los creó
SELECT 
    p.nombre AS producto,
    l.codigo_lote,
    lc.descripcion AS configuracion,
    l.fecha_vencimiento,
    l.total_unidades,
    l.cantidad_pallets,
    l.cantidad_bases,
    l.cantidad_fardos,
    l.cantidad_botellas,
    u.nombre AS usuario_creador
FROM Producto p
JOIN Lote l ON p.id_producto = l.id_producto
JOIN Lote_Configuracion lc ON l.id_configuracion = lc.id_configuracion
JOIN Usuario u ON l.id_usuario = u.id_usuario;

-- 2. Ver stock actual por sucursal
SELECT 
    p.nombre AS producto,
    s.nombre AS sucursal,
    st.cantidad_disponible,
    EstadoStock(p.id_producto, s.id_sucursal) AS estado_stock
FROM Producto p
JOIN Stock st ON p.id_producto = st.id_producto
JOIN Sucursal s ON st.id_sucursal = s.id_sucursal;

-- 3. Ver movimientos de stock con detalles de usuario y sucursal
SELECT 
    p.nombre AS producto,
    s.nombre AS sucursal,
    u.nombre AS usuario,
    ms.tipo_movimiento,
    ms.cantidad,
    ms.fecha_movimiento
FROM Movimiento_Stock ms
JOIN Producto p ON ms.id_producto = p.id_producto
JOIN Sucursal s ON ms.id_sucursal = s.id_sucursal
JOIN Usuario u ON ms.id_usuario = u.id_usuario;