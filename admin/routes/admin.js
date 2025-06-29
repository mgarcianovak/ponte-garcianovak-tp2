// crea un Router para manejar rutas específicas del administrador
const express = require('express');
const router = express.Router();
const adminController = require('../../admin/controller/admincontoroller');
const verificarToken = require('../middleware/verificarToken');
//Define las ruta:POST /admin/registrar: crea un administrador 
router.post("/registrar", adminController.registerAdmin);
//Define las ruta:POST /admin/login: Cuando el admin intenta iniciar sesión.
router.post('/login', adminController.loginAdmin);
//Define las ruta:get /admin/dashboard: para cargar los productos en el dashboard
router.get('/dashboard', adminController.renderproducto);
//Define las ruta:put /dashboard/:id/desactivar: para eliminar los productos en el dashboard
router.put('/dashboard/:id/desactivar',  adminController.desactivarProducto);
//Define las ruta:put /dashboard/:id/reactivar: para reactivar los productos en el dashboard
router.put('/dashboard/:id/reactivar',  adminController.reactivarProducto);


module.exports = router;