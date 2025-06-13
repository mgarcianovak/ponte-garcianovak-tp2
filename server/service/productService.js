class Product {
  constructor(id, name, price, category, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}

const products = [
  new Product(1, 'Notebook Lenovo', 800000, 'notebook', '/img/products/lenovo.jpg'),
  new Product(2, 'Macbook Air', 1200000, 'notebook', '/img/products/macbook.jpg'),
  new Product(3, 'Notebook HP', 700000, 'notebook', '/img/products/hp.png'),
  new Product(4, 'PC Gamer AMD', 600000, 'pc', '/img/products/pc_amd.jpg'),
  new Product(5, 'PC Gamer Intel', 800000, 'pc', '/img/products/pc_intel.jpg'),
  new Product(6, 'PC Oficina', 350000, 'pc', '/img/products/pc_oficina.jpg'),
];

module.exports = {
  getAllProducts: () => products,
  getProductsByCategory: (category) => products.filter(p => p.category === category),
  getProductById: (id) => products.find(p => p.id === parseInt(id))
};