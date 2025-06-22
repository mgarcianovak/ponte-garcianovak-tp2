class Product {
  constructor(id, name, price, category, image, active = true) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.active = active;
  }
}

const products = [
  new Product(1, 'Lenovo Thinkpad', 800000, 'notebook', '/img/products/notebooks/lenovo.jpg', true),
  new Product(2, 'Macbook Air', 1200000, 'notebook', '/img/products/notebooks/macbook.jpg', true),
  new Product(3, 'HP 255', 700000, 'notebook', '/img/products/notebooks/hp.png', true),
  new Product(4, 'ASUS X515EA', 1100000, 'notebook', '/img/products/notebooks/asus.jpg', true),
  new Product(5, 'Acer Inspire 3', 650000, 'notebook', '/img/products/notebooks/acer.jpg', true),
  new Product(6, 'Sony VAIO 14.1"', 750000, 'notebook', '/img/products/notebooks/vaio.jPg', true),
  new Product(7, 'PC Oficina', 350000, 'pc', '/img/products/pc/oficina.jpg', true),
  new Product(8, 'PC AMD Ryzen 5', 450000, 'pc', '/img/products/pc/r5.jpg', true),
  new Product(9, 'PC Intel Core i5', 500000, 'pc', '/img/products/pc/i5.jpg', true),
  new Product(10, 'Mini Pc Intel Nuc 10 Core I7', 1600000, 'pc', '/img/products/pc/mini.jpg', true),
  new Product(11, 'PC AMD Ryzen 7', 600000, 'pc', '/img/products/pc/r7.jpg', true),
  new Product(12, 'PC Intel Core i7', 700000, 'pc', '/img/products/pc/i7.jpg', true)
];

module.exports = {
  getAllProducts: () => products,
  getProductsByCategory: (category) => products.filter(p => p.category === category),
  getProductById: (id) => products.find(p => p.id === parseInt(id))
};