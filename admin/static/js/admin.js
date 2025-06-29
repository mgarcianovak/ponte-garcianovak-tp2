//para que guarde el email y contraseña y lo redirija al dashboard
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const contraseña = document.getElementById('contraseña').value.trim();
  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:3001/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`//envia un toquen de balidacion al backend
      },
      body: JSON.stringify({ email, contraseña })
    });

    if (!res.ok) throw new Error('Credenciales incorrectas');

    const data = await res.json();
    localStorage.setItem('adminId', data.id);
    window.location.href = '../html/admin-dashboard.html';
  } catch (err) {
    alert('Error de autenticación: ' + err.message);
  }
})});
document.getElementById("skip").addEventListener("click", () => {
  window.location.href = "../html/admin-dashboard.html";
});