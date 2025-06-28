document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("Contraseña").value;
  //registrar un administrador en la base de datos
  const res = await fetch("http://localhost:3001/admin/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  if (res.ok) {
    alert("Administrador creado con éxito");
    window.location.href = "/html/loginad.html";
  } else {
    const { error } = await res.json();
    alert("Error: " + error);
  }
});

document.getElementById("skip").addEventListener("click", () => {
  window.location.href = "/html/loginad.html";
});