const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.post('/crear', usuarioController.crearUsuario);

module.exports = router;
// Este archivo define las rutas relacionadas con los usuarios.
