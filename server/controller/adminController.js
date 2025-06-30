const Administrador = require('../models/administrador');
const Producto = require('../models/productos');
const bcrypt = require('bcrypt');

exports.registerForm = (req, res) => {
  res.render('register', {error:null});
};

exports.registerAdmin = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const existing = await Administrador.findOne({ where: { email } });
    if (existing) {
      return res.render('register', { error: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(pass, 10);

    await Administrador.create({ email, pass: hash });

    res.redirect('/admin/login');
  } catch (error) {
    console.error('Error al registrar admin:', error);
    res.render('register', { error: 'Error en el servidor' });
  }
};

exports.loginForm = (req, res) => {
  res.render('login');
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Administrador.findOne({ where: { email } });
    if (!admin) {
      return res.render('login', { error: 'Correo o contraseña inválidos' });
    }

    // si es el admin test, saltea bcrypt
    if (admin.email === 'test@admin.com') {
      if (password !== admin.pass) {
        return res.render('login', { error: 'Correo o contraseña inválidos' });
      }
    } else {
      // Para admins normales compara con hash
      const validarPassword = await bcrypt.compare(password, admin.pass);
      if (!validarPassword) {
        return res.render('login', { error: 'Correo o contraseña inválidos' });
      }
    }

    req.session.adminId = admin.id; // Guarda ID en la sesión

    // Redirige al Dashboard
    res.redirect('/admin/dashboard');

  } catch (err) {
    console.error('Error en loginAdmin:', err);
    res.status(500).send('Error en el servidor');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    const notebook = productos.filter(p => p.tipo === 'notebook');
    const pc = productos.filter(p => p.tipo === 'pc');

    res.render('dashboard', { notebook, pc });
  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).send("Error al cargar dashboard");
  }
};

exports.productForm = (req, res) => {
  res.render('productForm', { product: null });
};

exports.createProduct = async (req, res) => {
  try {
    await Producto.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      imagen: `/img/products/new/${req.file.filename}`,
      tipo: req.body.tipo,
      activo: true
    });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).send('Error al crear producto');
  }
};

exports.editForm = async (req, res) => {
  const product = await Producto.findByPk(req.params.id);
  res.render('productForm', { product });
};

exports.updateProduct = async (req, res) => {
  const product = await Producto.findByPk(req.params.id);
  product.nombre = req.body.nombre;
  product.precio = req.body.precio;
  product.tipo = req.body.tipo;
  if (req.file) {
    product.imagen = `/img/products/new/${req.file.filename}`;
  }
  await product.save();
  res.redirect('/admin/dashboard');
};

exports.desactivarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.activo = false;
    await producto.save();

    // Redirige de nuevo al dashboard
    res.redirect('/admin/dashboard');

  } catch (err) {
    console.error('Error al desactivar producto:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.reactivarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.activo = true;
    await producto.save();

    // Redirige de nuevo al dashboard
    res.redirect('/admin/dashboard');

  } catch (err) {
    console.error('Error al reactivar producto:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};