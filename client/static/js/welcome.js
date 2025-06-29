document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();

    if (nombre) {
      // Guarda nombre en localStorage
      localStorage.setItem('clientName', nombre);

      // Redirige a productos
      window.location.href = '/html/products.html';
    }
  });
});