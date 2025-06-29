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

        async function guardarTicketEnBBDD() {
          const nombreCliente = localStorage.getItem("clientName");
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

          if (!nombreCliente) {
            Swal.fire('Error', 'No se encontró el nombre del cliente.', 'error');
            return;
          }

          try {
            const response = await fetch('http://localhost:3001/api/tickets', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre_cliente: nombreCliente,
                total: total
              })
            });

            if (response.ok) {
              console.log('Ticket guardado en BBDD');
              window.location.href = "/html/ticket.html";
            } else {
              const errorText = await response.text();
              Swal.fire('Error', 'No se pudo guardar el ticket.\n' + errorText, 'error');
            }
          } catch (err) {
            console.error('Error de red:', err);
            Swal.fire('Error', 'No se pudo conectar al servidor.', 'error');
          }
        }

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
                guardarTicketEnBBDD();
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