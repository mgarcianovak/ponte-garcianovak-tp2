const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// GET login
router.get('/login', adminController.loginForm);

// POST login
router.post('/login', adminController.loginAdmin);

// GET dashboard protegido
router.get('/dashboard', authMiddleware.isAuthenticated, adminController.dashboard);

// POST desactivar
router.post('/products/:id/deactivate', authMiddleware.isAuthenticated, adminController.desactivarProducto);

// POST reactivar
router.post('/products/:id/activate', authMiddleware.isAuthenticated, adminController.reactivarProducto);

// Cerrar sesión
router.get('/logout', authMiddleware.isAuthenticated, adminController.logout);

module.exports = router;