const Administrador = require('../models/administrador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Producto = require('../models/productos');

//Importa el modelo Administrador para consultar en la base de datos.
//Importa bcrypt para comparar contraseñas encriptadas.
//Importa jsonwebtoken para crear tokens JWT al loguearse.

//logica para crear un administrador en la base de datos 
exports.registerAdmin = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const existing = await Administrador.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    await Administrador.create({ email, contraseña: hash });
    res.status(201).json({ message: "Administrador creado" });
  } catch (error) {
    console.error("Error al crear admin:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
//logica para inicio de secion del administrador llamando a la base para que me traiga los datos del admin compararlos
exports.loginAdmin = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const admin = await Administrador.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Correo o contraseña inválidos' });
    }

    const validarcontraseña = await bcrypt.compare(contraseña, admin.contraseña);
    if (!validarcontraseña) {
      return res.status(401).json({ error: 'Correo o contraseña inválidos' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, 'secreto_super_seguro', {
      expiresIn: '1h'
    });//creo un toquen que dura 1 hs para que el administrador trabaje de forma segura

    res.json({ token });
  } catch (err) {
    console.error('Error en loginAdmin:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

//logica para cargar un producto para el dashboard traidos desde la base de datos
exports.renderproducto = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { activo: true }
    });
    const mapeo_productos = productos.map(product => ({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      category: product.tipo,
    }));
    
    res.json(mapeo_productos); 
  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).send("Error al cargar productos");
  }
};
//logica para eliminar un producto en la base de datos (canviar el activo de true a falce)
exports.desactivarProducto = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.activo = false;
    await producto.save();

    res.status(200).json({ mensaje: 'Producto desactivado correctamente' });
  } catch (err) {
    console.error('Error al desactivar producto:', err);
    res.status(500).send('Error del servidor');
  }
};
//logica para reactivar un producto en la base de datos (canviar el activo de falce a true)
exports.reactivarProducto = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.activo = true;
    await producto.save();

    res.status(200).json({ mensaje: 'Producto reactivado correctamente' });
  } catch (err) {
    console.error('Error al reactivar producto:', err);
    res.status(500).send('Error del servidor');
  }
};

//estos ultimos modifican lo que ve del lado del cliente