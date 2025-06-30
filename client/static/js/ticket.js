document.addEventListener("DOMContentLoaded", () => {
  const clientName = localStorage.getItem("clientName") || "Cliente";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const ticketBody = document.getElementById("ticket-body");
  const totalAmount = document.getElementById("total-amount");
  const clientNameSpan = document.getElementById("client-name");
  const dateSpan = document.getElementById("date");
  const restartBtn = document.getElementById("restart-btn");

  // Mostrar nombre del cliente
  clientNameSpan.textContent = clientName;

  // Mostrar fecha actual
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  dateSpan.textContent = formattedDate;

  // Renderizar carrito
  let total = 0;
  ticketBody.innerHTML = "";

  cart.forEach(product => {
    const subtotal = product.price * product.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>${formatCurrency(subtotal)}</td>
    `;
    ticketBody.appendChild(row);
  });

  totalAmount.textContent = formatCurrency(total);

  // Botón "Volver al Inicio"
  restartBtn.addEventListener("click", () => {
    localStorage.removeItem("clientName");
    localStorage.removeItem("cart");
    window.location.href = "/html/welcome.html";
  });
  //descargar pdf
  document.getElementById("download-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const clientName = localStorage.getItem("clientName") || "Cliente";
    const date = new Date().toLocaleDateString("es-AR");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let y = 20;

    // Título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("TechStore", 105, y, { align: "center" });
    y += 10;

    // Línea
    doc.setDrawColor(0);
    doc.line(20, y, 190, y);
    y += 6;

    // Datos del cliente
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${clientName}`, 20, y);
    y += 6;
    doc.text(`Fecha: ${date}`, 20, y);
    y += 10;

    // Título productos
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Productos:", 20, y);
    y += 8;

    // Lista de productos
    let total = 0;
    doc.setFont("helvetica", "normal");
    cart.forEach(p => {
      const subtotal = p.price * p.quantity;
      total += subtotal;
      doc.text(`${p.name} x${p.quantity} - $${subtotal.toFixed(2)}`, 20, y);
      y += 7;
    });

    y += 5;

    // Total destacado
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 150);
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 20, y);

    // Guardar PDF
    doc.save("ticket.pdf");
  });
});
