const Product = require('../model/Product');

// Productos hardcodeados por ahora. Proximos a implementar via bbdd
const products = [
  new Product(1, 'Notebook Lenovo', 800, 'notebook', '/img/products/lenovo.jpg'),
  new Product(2, 'Macbook Air', 1200, 'notebook', '/img/products/macbook.jpg'),
  new Product(3, 'Notebook HP', 700, 'notebook', '/img/products/hp.png'),
  new Product(4, 'PC Gamer AMD', 1500, 'pc', '/img/products/pc_amd.png'),
  new Product(5, 'PC Intel i7', 1400, 'pc', '/img/products/pc_i7.png'),
  new Product(6, 'PC Básica', 600, 'pc', '/img/products/pc_basic.png'),
];

module.exports = {
  getAllProducts: () => products,

  getProductsByCategory: (category) =>
    products.filter(product => product.category === category),

  getProductById: (id) =>
    products.find(product => product.id === parseInt(id)),
};
