const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/static/img/products');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage: storage });

router.get('/login', adminController.loginForm);
router.post('/login', adminController.loginAdmin);

router.get('/dashboard', authMiddleware.isAuthenticated, adminController.dashboard);

router.get('/products/new', authMiddleware.isAuthenticated, adminController.productForm);
router.post('/products/new', authMiddleware.isAuthenticated, upload.single('imagen'), adminController.createProduct);

router.get('/products/:id/edit', authMiddleware.isAuthenticated, adminController.editForm);
router.post('/products/:id/edit', authMiddleware.isAuthenticated, upload.single('imagen'), adminController.updateProduct);

router.post('/products/:id/deactivate', authMiddleware.isAuthenticated, adminController.desactivarProducto);
router.post('/products/:id/activate', authMiddleware.isAuthenticated, adminController.reactivarProducto);

router.get('/logout', authMiddleware.isAuthenticated, adminController.logout);

module.exports = router;