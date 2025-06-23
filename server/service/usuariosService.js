const Usuarios = require('../models/usuarios');
// Este servicio se encarga de gestionar los usuarios
// y contiene la lógica para crear un nuevo usuario en la base de datos.
exports.crearUsuario = async (nombre) => {
  return await Usuarios.create({ nombre });
};