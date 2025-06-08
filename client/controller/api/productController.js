const productService = require('../../service/productService');

module.exports = {
  getAll: async (req, res) => {
    try{
      const products = await productService.getAllProducts();
      res.json(products);
    }
    catch(error){
      console.log(error);
    }
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
