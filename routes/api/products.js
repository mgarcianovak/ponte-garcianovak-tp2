const express = require('express');
const router = express.Router();
const productController = require('../../controller/api/productController');

router.get('/', productController.getAll);
router.get('/:category', productController.getByCategory);
router.get('/id/:id', productController.getById);

module.exports = router;