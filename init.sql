-- ============================================================
-- Script de inicialización para base de datos: techZone
-- Crea tabla productos y tickets, y carga productos de ejemplo
-- ============================================================

-- Usar base de datos
USE techZone;

-- ============================================================
-- Tabla productos
-- ============================================================
DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO productos (id, nombre, precio, tipo, imagen, activo) VALUES
(1, 'Lenovo Thinkpad', 800000, 'notebook', '/img/products/notebooks/lenovo.jpg', TRUE),
(2, 'Macbook Air', 1200000, 'notebook', '/img/products/notebooks/macbook.jpg', TRUE),
(3, 'HP 255', 700000, 'notebook', '/img/products/notebooks/hp.png', TRUE),
(4, 'ASUS X515EA', 1100000, 'notebook', '/img/products/notebooks/asus.jpg', TRUE),
(5, 'Acer Inspire 3', 650000, 'notebook', '/img/products/notebooks/acer.jpg', TRUE),
(6, 'Sony VAIO 14.1"', 750000, 'notebook', '/img/products/notebooks/vaio.jpg', TRUE),
(7, 'PC Oficina', 350000, 'pc', '/img/products/pc/oficina.jpg', TRUE),
(8, 'PC AMD Ryzen 5', 450000, 'pc', '/img/products/pc/r5.jpg', TRUE),
(9, 'PC Intel Core i5', 500000, 'pc', '/img/products/pc/i5.jpg', TRUE),
(10, 'Mini Pc Intel Nuc 10 Core I7', 1600000, 'pc', '/img/products/pc/mini.jpg', TRUE),
(11, 'PC AMD Ryzen 7', 600000, 'pc', '/img/products/pc/r7.jpg', TRUE),
(12, 'PC Intel Core i7', 700000, 'pc', '/img/products/pc/i7.jpg', TRUE);

-- ============================================================
-- Tabla tickets
-- ============================================================
DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(100) NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL
);

-- Nota: no insertamos registros de tickets porque se generan al confirmar la compra.

-- ============================================
-- Crear tabla administrador
-- ============================================
DROP TABLE IF EXISTS administrador;
CREATE TABLE administrador (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  pass VARCHAR(255) NOT NULL
);

-- ============================================
-- Insertar admin de prueba
-- ============================================

INSERT INTO administrador (email, pass)
VALUES ('test@admin.com', '123456');