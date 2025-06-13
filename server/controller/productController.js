const productService = require('../service/productService');

exports.getAll = (req, res) => {
  const products = productService.getAllProducts();
  res.json(products);
};

exports.getByCategory = (req, res) => {
  const category = req.params.category;
  const products = productService.getProductsByCategory(category);
  res.json(products);
};

exports.getById = (req, res) => {
  const id = req.params.id;
  const product = productService.getProductById(id);
  res.json(product);
};