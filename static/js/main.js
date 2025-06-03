const notebooksContainer = document.getElementById("notebooks");
const pcsContainer = document.getElementById("pcs");

// Obtener el carrito desde localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Guardar el carrito en localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para obtener productos desde una URL
async function fetchProducts(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// Crear una tarjeta de producto
function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100 product-card";

  const img = document.createElement("img");
  img.src = product.image || "https://via.placeholder.com/150";
  img.className = "card-img-top product-img";
  img.alt = product.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = product.name;

  const desc = document.createElement("p");
  desc.className = "card-text";
  desc.textContent = product.description || "";

  const price = document.createElement("p");
  price.className = "card-text fw-bold";
  price.textContent = `$ ${product.price.toFixed(2)}`;

  const btnGroup = document.createElement("div");
  btnGroup.className = "d-flex justify-content-between";

  const btnAdd = document.createElement("button");
  btnAdd.className = "btn btn-success btn-add";
  btnAdd.textContent = "Agregar";

  const btnRemove = document.createElement("button");
  btnRemove.className = "btn btn-danger";
  btnRemove.textContent = "Quitar";

  // Evento para agregar al carrito
  btnAdd.addEventListener("click", () => {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id && item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    alert("Producto agregado al carrito");
  });

  // Evento para quitar del carrito
  btnRemove.addEventListener("click", () => {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === product.id && item.name === product.name);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      saveCart(cart);
      alert("Producto eliminado del carrito");
    }
  });

  btnGroup.appendChild(btnAdd);
  btnGroup.appendChild(btnRemove);

  cardBody.append(title, desc, price, btnGroup);
  card.append(img, cardBody);
  col.appendChild(card);

  return col;
}

// Cargar productos al inicio
async function loadProducts() {
  const notebooks = await fetchProducts("/api/notebooks");
  const pcs = await fetchProducts("/api/pcs");

  notebooksContainer.innerHTML = "";
  pcsContainer.innerHTML = "";

  notebooks.forEach(product => {
    const card = createProductCard(product);
    notebooksContainer.appendChild(card);
  });

  pcs.forEach(product => {
    const card = createProductCard(product);
    pcsContainer.appendChild(card);
  });
}

loadProducts();