//crear un usuario en la base de datos 
const { Usuarios } = require('../models/usuarios');

//crear un usuario en la base de datos
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoUsuario = await Usuarios.create({ nombre });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al registrar usuario:", error); // 👈 Mostralo en consola
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};
//revisar