document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre) {
      localStorage.setItem('nombreUsuario', nombre);
      window.location.href = 'products.html';
    }
  });
});