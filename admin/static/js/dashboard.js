document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
//codigo para el dasdboard para cargar los productos:
  fetch('http://localhost:3001/admin/dashboard', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudieron cargar los productos");
    }
    return response.json();
  })
  .then(productos => {
    const contenedor = document.getElementById('productos');
    contenedor.addEventListener.innerHTML = '';

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('col');
      card.innerHTML = `
        <img src="${producto.image}" class="card-img-top alt=" ${producto.name}" width="250">
        <h3>${producto.name}</h3>
        <p>$${producto.price}</p>
        <p>Categoría: ${producto.category}</p>
        <button onclick="editarProducto(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>

      `;
      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error cargando productos:', error.message);
    alert('Error al cargar productos');
  });
});
//para editar algun producto (todavia no implementado):
function editarProducto(id) {
  // Redirigir a la pantalla de edición con el ID en la URL
  window.location.href = `/admin/editar-producto.html?id=${id}`;
}
//para eliminar el preducto segun su id:
function eliminarProducto(id) {
  if (confirm("¿Estás seguro que querés desactivar este producto?")) {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3001/admin/dashboard/${id}/desactivar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ activo: false })
    })
    .then(response => {
      if (!response.ok) throw new Error('No se pudo desactivar');
      alert(`Producto con ID ${id} desactivado`);
      window.location.reload();
    })
    .catch(err => {
      console.error('Error desactivando:', err.message);
    });
  }
}
//para reactivar un producto eliminado a traves de un imput donde el usuario ingresa el id a reactivar
document.getElementById("form-reactivar").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("input-id").value.trim();//El método .trim() en JavaScript elimina los espacios en blanco al principio y al final de un string.
  if (!id) {
    alert("Por favor ingresá un ID válido.");
    return;
  }
  if (confirm("¿Estás seguro que querés reactivar este producto?")) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/admin/dashboard/${id}/reactivar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activo: true }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo reactivar el producto.");
        alert(`Producto con ID ${id} reactivado`);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error al reactivar producto:", err.message);
        alert(`Producto con ID ${id} no existe o esta activado`);
        window.location.reload();
      });
  }
});
