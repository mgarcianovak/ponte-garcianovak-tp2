const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();

//Define las rutas de la API.
router.get('/', productController.getAll);
router.get('/categoria/:category', productController.getByCategory);
router.get('/:id', productController.getById);

module.exports = router;



