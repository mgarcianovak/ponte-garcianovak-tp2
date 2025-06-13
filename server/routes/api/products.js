const express = require('express');
const router = express.Router();
const productController = require('../../controller/productController');

router.get('/', productController.getAll);
router.get('/category/:category', productController.getByCategory);
router.get('/id/:id', productController.getById);

module.exports = router;