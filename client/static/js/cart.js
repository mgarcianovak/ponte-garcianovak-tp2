document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalSpan = document.getElementById("total");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }

  function updateCartView() {
    const cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
      totalSpan.textContent = "0";
      return;
    }

    cart.forEach((product, index) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";

      const card = document.createElement("div");
      card.className = "card h-100";

      const img = document.createElement("img");
      img.src = product.image;
      img.className = "card-img-top";
      img.alt = product.name;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = product.name;

      const quantity = document.createElement("p");
      quantity.className = "card-text";
      quantity.textContent = `Cantidad: ${product.quantity}`;

      const price = document.createElement("p");
      price.className = "card-text fw-bold";
      price.textContent = `$ ${product.price.toFixed(2)} c/u`;

      const btnGroup = document.createElement("div");
      btnGroup.className = "btn-group mt-2";

      const btnAdd = document.createElement("button");
      btnAdd.textContent = "+";
      btnAdd.className = "btn btn-sm btn-success";
      btnAdd.addEventListener("click", () => {
        product.quantity++;
        saveCart(cart);
        updateCartView();
      });

      const btnRemove = document.createElement("button");
      btnRemove.textContent = "-";
      btnRemove.className = "btn btn-sm btn-danger";
      btnRemove.addEventListener("click", () => {
        product.quantity--;
        if (product.quantity <= 0) {
          cart.splice(index, 1);
        }
        saveCart(cart);
        updateCartView();
      });

      btnGroup.appendChild(btnAdd);
      btnGroup.appendChild(btnRemove);

      cardBody.append(title, quantity, price, btnGroup);
      card.append(img, cardBody);
      col.appendChild(card);
      cartContainer.appendChild(col);
    });

    totalSpan.textContent = calculateTotal(cart);
  }

  updateCartView();
});
