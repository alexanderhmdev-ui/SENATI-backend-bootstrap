CREATE DATABASE IF NOT EXISTS tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos
(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca  VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    update_at DATETIME NULL
)ENGINE = INNODB;

INSERT INTO productos
	(marca, descripcion, precio, stock)
    VALUES
    ('Samsung', 'TV 55', 2500, 10),
    ('LG', 'Lavadora', 1200, 3),
    ('Sony', 'Playstation 5', 3200, 2);

CREATE TABLE IF NOT EXISTS clientes
(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    email VARCHAR(120) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NULL
)ENGINE = INNODB;

INSERT INTO clientes
	(apellidos, nombres, telefono, direccion, email)
    VALUES
    ('Quispe Mamani', 'Carlos Alberto', '956123456', 'Av. San Martin 450, Ica', 'carlos.quispe@email.com'),
    ('Rojas Mendoza', 'Maria Fernanda', '987654321', 'Jr. Lima 218, Chincha Alta', 'maria.rojas@email.com'),
    ('Torres Huaman', 'Luis Enrique', '944789123', 'Calle Bolivar 105, Pisco', 'luis.torres@email.com');

CREATE TABLE IF NOT EXISTS proveedores
(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial VARCHAR(150) NOT NULL,
    contacto VARCHAR(100) NOT NULL,
    ruc CHAR(11) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NULL
)ENGINE = INNODB;

INSERT INTO proveedores
	(razonsocial, contacto, ruc, direccion)
    VALUES
    ('Distribuidora Andina S.A.C.', 'Jorge Salazar', '20512345678', 'Av. Industrial 1240, Lima'),
    ('Importaciones del Sur E.I.R.L.', 'Ana Lucia Paredes', '20609876543', 'Panamericana Sur Km 298, Ica'),
    ('Comercializadora Pacifico S.R.L.', 'Roberto Campos', '20487654321', 'Calle Comercio 512, Chincha');

SELECT * FROM productos;
SELECT * FROM clientes;
SELECT * FROM proveedores;

CREATE TABLE IF NOT EXISTS tiendas
(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cuidad VARCHAR(150) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
	telefono CHAR(11) NOT NULL,
    responsable VARCHAR(200) NOT NULL,
	apertura DATETIME NOT NULL DEFAULT NOW(),
    cierre  DATETIME NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    update_at DATETIME NULL
)ENGINE = INNODB;