const express = require('express');
const router = express.Router();

const notebooks = [
  { id: 1, name: "Notebook Lenovo", description: "Intel i5, 8GB RAM, SSD", price: 1000, image: "https://http2.mlstatic.com/D_NQ_NP_2X_847239-MLU75704428598_042024-F.webp" },
  { id: 2, name: "Notebook HP", description: "AMD Ryzen 5, 16GB RAM, SSD", price: 1200, image: "https://http2.mlstatic.com/D_NQ_NP_2X_866247-MLA79617244977_092024-F.webp" }
];

const pcs = [
  { id: 1, name: "PC Gamer", description: "Intel i7, RTX 3060, 16GB RAM", price: 1800, image: "https://electropc.com.ar/wp-content/uploads/DISENO-AVANZADO-PAGINA-jpg.webp" },
  { id: 2, name: "PC Oficina", description: "Intel i3, 8GB RAM, SSD", price: 700, image: "https://mexx-img-2019.s3.amazonaws.com/37790_1.jpeg" }
];

router.get('/notebooks', (req, res) => {
  res.json(notebooks);
});

router.get('/pcs', (req, res) => {
  res.json(pcs);
});

module.exports = router;