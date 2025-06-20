document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  navbarPlaceholder.innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top mb-4" style="background-color: #0D1B2A; color: #E0E1DD">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center text-white" href="/html/products.html">
          <img src="/img/logo.png" alt="Logo" width="40" height="40" class="me-2" />
          <span>TechStore</span>
        </a>
        <span class="navbar-text text-white mx-3">Ponte, Lucas / Garcia Novak, Mariano</span>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white" href="/html/products.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/html/cart.html">Carrito</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/html/checkout.html">Finalizar compra</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/html/index.html">Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  const navbar = document.querySelector("nav.navbar");
  if (navbar) {
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = navbarHeight + "px";
  }
});