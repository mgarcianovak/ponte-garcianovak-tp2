document.addEventListener("DOMContentLoaded", () => {
  const notebooksContainer = document.getElementById("notebooks");
  const pcsContainer = document.getElementById("pcs");

  const notebooksPagination = { currentPage: 1, perPage: 3, data: [] };
  const pcsPagination = { currentPage: 1, perPage: 3, data: [] };

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

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    saveCart(cart);
  }

  function removeFromCart(product) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart(cart);
    }
  }

  function showCartMessage(text, type = 'add') {
    const div = document.createElement("div");
    div.className = `cart-feedback ${type === 'remove' ? 'remove' : ''}`;
    div.textContent = text;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  function renderProductCard(product, container) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = product.image;
    img.className = "card-img-top";
    img.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "card-text fw-bold";
    price.textContent = `${formatCurrency(product.price)}`;

    const quantityDisplay = document.createElement("p");
    quantityDisplay.className = "card-text mb-1 text-end";
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    quantityDisplay.textContent = `En carrito: ${existing ? existing.quantity : 0}`;

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.value = 1;
    quantityInput.className = "form-control";
    quantityInput.style.width = "60px";

    const btnAdd = document.createElement("button");
    btnAdd.className = "btn";
    btnAdd.textContent = "Agregar";
    btnAdd.addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        addToCart(product, quantity);
        updateCard();
        showCartMessage(`${quantity} producto(s) agregado(s) al carrito`);
      }
    });

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn";
    btnRemove.textContent = "Eliminar";
    btnRemove.addEventListener("click", () => {
      removeFromCart(product);
      updateCard();
      showCartMessage(`1 producto eliminado del carrito`, 'remove');
    });

    const controls = document.createElement("div");
    controls.className = "product-controls";
    controls.append(quantityInput, btnAdd, btnRemove);

    function updateCard() {
      const cartUpdated = getCart();
      const found = cartUpdated.find(item => item.id === product.id);
      quantityDisplay.textContent = `En carrito: ${found ? found.quantity : 0}`;
      btnRemove.disabled = !found || found.quantity === 0;
    }

    updateCard();

    cardBody.append(title, price, quantityDisplay, controls);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  }

  function renderPaginatedProducts(container, pagination) {
    container.innerHTML = "";
    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    pagination.data.slice(start, end).forEach(p => renderProductCard(p, container));
  }

  function setupPaginationControls(containerId, pagination, renderFn) {
    const prevBtn = document.getElementById(`prev-${containerId}`);
    const nextBtn = document.getElementById(`next-${containerId}`);
    const pageLabel = document.getElementById(`page-${containerId}`);

    function update() {
      renderFn();
      const totalPages = Math.ceil(pagination.data.length / pagination.perPage);
      pageLabel.textContent = `Página ${pagination.currentPage} de ${totalPages}`;
      prevBtn.disabled = pagination.currentPage === 1;
      nextBtn.disabled = pagination.currentPage >= totalPages;
    }

    prevBtn.addEventListener("click", () => {
      if (pagination.currentPage > 1) {
        pagination.currentPage--;
        update();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(pagination.data.length / pagination.perPage);
      if (pagination.currentPage < totalPages) {
        pagination.currentPage++;
        update();
      }
    });

    update(); // render inicial
  }
//cambio la paginacion por que ya lo filtro en el bakend
  async function renderProducts() {
    const products = await fetchProducts();

    notebooksPagination.data = products.filter(p => p.category === "notebook" );
    pcsPagination.data = products.filter(p => p.category === "pc" );

    setupPaginationControls("notebooks", notebooksPagination, () =>
      renderPaginatedProducts(notebooksContainer, notebooksPagination)
    );

    setupPaginationControls("pcs", pcsPagination, () =>
      renderPaginatedProducts(pcsContainer, pcsPagination)
    );
  }

  renderProducts();
});