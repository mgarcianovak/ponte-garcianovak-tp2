const express = require('express');
const path = require('path');
const app = express();

// Middleware para JSON
app.use(express.json());

// Archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/static')));

// Rutas de la API
const productRoutes = require('./routes/api/products');
app.use('/api', productRoutes);

// Ruta raíz index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/html/index.html'));
});

// Ruta raíz productos
app.get('/products.html', (req, res) => {
  res.sendFile(path.join(__dirname, './static/html/products.html'));
});

// Ruta raíz carrito
app.get('/carrito.html', (req, res) => {
  res.sendFile(path.join(__dirname, './static/html/carrito.html'));
});

// Catch-all para rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
