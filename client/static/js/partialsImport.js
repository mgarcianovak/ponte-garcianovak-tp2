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