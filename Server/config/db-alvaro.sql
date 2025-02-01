DROP DATABASE IF EXISTS lomoplateado;
CREATE DATABASE lomoplateado;
USE lomoplateado;

CREATE TABLE proveedores (
id_proveedor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
apellido_proveedor VARCHAR (50),
nombre_proveedor VARCHAR (50),
codigo_proveedor VARCHAR (50),
email_proveedor VARCHAR (50),
numero_proveedor VARCHAR (50)
);

CREATE TABLE clientes (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
apellido_cliente VARCHAR (50),
nombre_cliente VARCHAR (50),
mail_cliente VARCHAR (50),
numero_cliente VARCHAR (50)
);

INSERT INTO proveedores (apellido_proveedor,nombre_proveedor,codigo_proveedor,email_proveedor,numero_proveedor) values (
"Albornoz","Alvaro","AA","alvaro@gmail.com","3816821901"
);
INSERT INTO proveedores (apellido_proveedor,nombre_proveedor,codigo_proveedor,email_proveedor,numero_proveedor) values (
"Flores","Diego","FD","diego@gmail.com","3816155136"
);

select * from proveedores;