document.addEventListener("DOMContentLoaded", () => {
  const navbarTarget = document.getElementById("navbar-partial");
  if (navbarTarget) {
    fetch("/html/partials/navbar.html")
      .then(res => res.text())
      .then(html => {
        navbarTarget.innerHTML = html;
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            localStorage.removeItem("clientName");
          });
        }

        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) {
          checkoutBtn.addEventListener("click", () => {
            Swal.fire({
              title: '¿Finalizar compra?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Finalizar',
              cancelButtonText: 'Cancelar',
              background: '#415A77',
              color: '#ffffff',
              confirmButtonColor: '#0D1B2A',
              cancelButtonColor: '#888',
              customClass: {
                popup: 'rounded-3',
                confirmButton: 'btn',
                cancelButton: 'btn'
              }
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/html/ticket.html";
              }
            });
          });
        }
      })
      .catch(err => console.error("Error cargando navbar:", err));
  }

  const footerTarget = document.getElementById("footer-partial");
  if (footerTarget) {
    fetch("/html/partials/footer.html")
      .then(res => res.text())
      .then(html => footerTarget.innerHTML = html)
      .catch(err => console.error("Error cargando footer:", err));
  }
});