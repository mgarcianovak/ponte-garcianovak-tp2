const productService = require('../../service/productService');

module.exports = {
  getAll: (req, res) => {
    res.json(productService.getAllProducts());
  },

  getByCategory: (req, res) => {
    const category = req.params.category;
    const products = productService.getProductsByCategory(category);
    res.json(products);
  },

  getById: (req, res) => {
    const product = productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  }
};
