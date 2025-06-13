const apiService = require('../../service/apiService');

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await apiService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  },

  getByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const products = await apiService.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener productos por categoría' });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await apiService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener producto por id' });
    }
  }
};