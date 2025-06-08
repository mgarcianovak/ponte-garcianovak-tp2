const Product = require('../model/Product');

// Productos hardcodeados por ahora. Proximos a implementar via bbdd
const products = [
  new Product(1, 'Notebook Lenovo', 800000, 'notebook', '/img/products/lenovo.jpg'),
  new Product(2, 'Macbook Air', 1200000, 'notebook', '/img/products/macbook.jpg'),
  new Product(3, 'Notebook HP', 700000, 'notebook', '/img/products/hp.png'),
  new Product(4, 'PC Gamer AMD', 600000, 'pc', '/img/products/pc_amd.jpg'),
  new Product(5, 'PC Gamer Intel', 800000, 'pc', '/img/products/pc_intel.jpg'),
  new Product(6, 'PC Oficina', 350000, 'pc', '/img/products/pc_oficina.jpg'),
];

const obtenerProductos = async () => {
  try {
    const url = `http://localhost:3001/product`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts: async () => await obtenerProductos(),

  getProductsByCategory: (category) =>
    products.filter(product => product.category === category),

  getProductById: (id) =>
    products.find(product => product.id === parseInt(id)),
};
