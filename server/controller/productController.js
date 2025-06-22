const productService = require('../service/productService');
// Controlador para manejar las peticiones relacionadas con productos
//modifico para que devuelva un objeto con los campos como estan en la base de datos
exports.getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    const mapeo_productos = products.map(product => ({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      category: product.tipo,
    }));
    res.json(mapeo_productos);
  }
  catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
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

