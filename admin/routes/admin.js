
// crea un Router para manejar rutas específicas del administrador
const express = require('express');
const router = express.Router();
const adminController = require('../../admin/controller/admincontoroller');
const verificarToken = require('../middleware/verificarToken');
//Define las ruta:POST /admin/registrar: crea un administrador 
//Define las ruta:POST /admin/login: Cuando el admin intenta iniciar sesión.
router.post("/registrar", adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
//router.get('/dashboard', verificarToken, adminController.mostrarDashboard);
//router.post('/producto/crear', verificarToken, adminController.crearProducto);

module.exports = router;