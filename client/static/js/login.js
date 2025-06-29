//para que guarde el nombre del usuario y lo redirija a productos
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();

    if (nombre) {
      try {
        const res = await fetch('http://localhost:3001/users/crear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre })
        });

        if (!res.ok) throw new Error("Error al registrar usuario");

        const data = await res.json();

        // Guarda nombre e ID del usuario
        localStorage.setItem('clientName', data.nombre);
        localStorage.setItem('usuarioId', data.id);

        // Redirige a productos
        window.location.href = '/html/products.html';
      } catch (err) {
        console.error("Fallo al registrar el usuario:", err);
        alert("Ocurrió un error al registrar el usuario.");
      }
    } else {
      alert("Por favor, ingresá un nombre.");
    }
  });
  //agrego boton de skip
  document.getElementById("skip").addEventListener("click", () => {
  window.location.href = "../html/products.html";
  });
});