const Producto = require('../models/productos.js');
const sequelize = require('../config/bd');


//Habla directamente con la base de datos usando Sequelize.
//trae los productos activos de la base de datos
//y los devuelve como un array de objetos.
const getAllProducts = async () => {
  return await Producto.findAll({ where: { activo: true } });
};

const getProductsByCategory = async (category) => {
  return await Producto.findAll({ where: { tipo: category, activo: true } });
};

const getProductById = async (id) => {
  return await Producto.findByPk(id);
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById
};

/*
const products = [
  new Product(1, 'Notebook Lenovo', 800000, 'notebook', '/img/products/lenovo.jpg'),
  new Product(2, 'Macbook Air', 1200000, 'notebook', '/img/products/macbook.jpg'),
  new Product(3, 'Notebook HP', 700000, 'notebook', '/img/products/hp.png'),
  new Product(4, 'PC Gamer AMD', 600000, 'pc', '/img/products/pc_amd.jpg'),
  new Product(5, 'PC Gamer Intel', 800000, 'pc', '/img/products/pc_intel.jpg'),
  new Product(6, 'PC Oficina', 350000, 'pc', '/img/products/pc_oficina.jpg'),
];
*/