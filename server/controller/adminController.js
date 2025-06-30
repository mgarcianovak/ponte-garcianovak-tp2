const Administrador = require('../models/administrador');
const Producto = require('../models/productos');
const bcrypt = require('bcrypt');

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Administrador.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    await Administrador.create({ email, pass: hash });
    res.status(201).json({ message: "Administrador creado" });
  } catch (error) {
    console.error("Error al crear admin:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.loginForm = (req, res) => {
  res.render('login');  // Renderiza views/login.ejs
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
    res.redirect('dashboard');

  } catch (err) {
    console.error('Error en loginAdmin:', err);
    res.status(500).send('Error en el servidor');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    const mapeo_productos = productos.map(product => ({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      active: product.activo,
      image: product.imagen,
      category: product.tipo,
    }));

    res.render('dashboard', { products: mapeo_productos });
  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).send("Error al cargar dashboard");
  }
};

exports.desactivarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).send('Producto no encontrado');

    producto.activo = false;
    await producto.save();

    // Redirige de nuevo al dashboard
    res.redirect('dashboard');

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
    res.redirect('dashboard');

  } catch (err) {
    console.error('Error al reactivar producto:', err);
    res.status(500).send('Error del servidor');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('login');
  });
};