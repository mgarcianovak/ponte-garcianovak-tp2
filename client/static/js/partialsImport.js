document.addEventListener("DOMContentLoaded", () => {
  const navbarTarget = document.getElementById("navbar-partial");
  const footerTarget = document.getElementById("footer-partial");

  if (navbarTarget) {
    fetch("/html/partials/navbar.html")
      .then(res => res.text())
      .then(html => navbarTarget.innerHTML = html)
      .catch(err => console.error("Error cargando navbar:", err));
  }

  if (footerTarget) {
    fetch("/html/partials/footer.html")
      .then(res => res.text())
      .then(html => footerTarget.innerHTML = html)
      .catch(err => console.error("Error cargando footer:", err));
  }
});