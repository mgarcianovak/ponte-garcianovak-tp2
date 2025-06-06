document.addEventListener("DOMContentLoaded", () => {
  const notebooksContainer = document.getElementById("notebooks");
  const pcsContainer = document.getElementById("pcs");

  // Obtener productos del backend
  async function fetchProducts() {
    try {
      const response = await fetch("/products");
      if (!response.ok) throw new Error("Error al obtener productos");
      return await response.json();
    } catch (err) {
      console.error("Error al cargar productos:", err);
      return [];
    }
  }

  // Obtener carrito desde localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Guardar carrito en localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Agregar producto al carrito
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    saveCart(cart);
    alert(`Producto agregado al carrito: ${product.name}`);
  }

  // Eliminar producto del carrito
  function removeFromCart(product) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart(cart);
      alert(`Producto eliminado del carrito: ${product.name}`);
    }
  }

  // Renderizar una tarjeta de producto
  function renderProductCard(product, container) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = product.image;
    img.className = "card-img-top product-img";
    img.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "card-text fw-bold";
    price.textContent = `$${product.price.toFixed(2)}`;

    const btnAdd = document.createElement("button");
    btnAdd.className = "btn btn-success btn-sm me-2";
    btnAdd.textContent = "Agregar";
    btnAdd.addEventListener("click", () => addToCart(product));

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn btn-danger btn-sm";
    btnRemove.textContent = "Eliminar";
    btnRemove.addEventListener("click", () => removeFromCart(product));

    cardBody.append(title, price, btnAdd, btnRemove);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  }

  // Renderizar todos los productos
  async function renderProducts() {
    const products = await fetchProducts();

    notebooksContainer.innerHTML = "";
    pcsContainer.innerHTML = "";

    products.forEach(product => {
      if (product.category === "notebook") {
        renderProductCard(product, notebooksContainer);
      } else if (product.category === "pc") {
        renderProductCard(product, pcsContainer);
      }
    });
  }

  renderProducts();
});