const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Rutas estaticas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/html/welcome.html'));
});

// Rutas API
const productsRouter = require('./routes/api/productsRouter');
app.use('/products', productsRouter);

// Fallback 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});