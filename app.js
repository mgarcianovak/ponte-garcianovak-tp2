const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'static')));

// Montar el router de productos en /api
const productsRouter = require('./routes/api/products');
app.use('/api', productsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/html/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
