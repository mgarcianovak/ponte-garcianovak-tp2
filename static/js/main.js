const notebooksContainer = document.getElementById("notebooks");
const pcsContainer = document.getElementById("pcs");

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

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.src = product.image || "https://via.placeholder.com/150";
  img.className = "card-img-top";
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
  btnAdd.className = "btn btn-success";
  btnAdd.textContent = "Agregar";

  const btnRemove = document.createElement("button");
  btnRemove.className = "btn btn-danger";
  btnRemove.textContent = "Quitar";

  btnGroup.appendChild(btnAdd);
  btnGroup.appendChild(btnRemove);

  cardBody.append(title, desc, price, btnGroup);
  card.append(img, cardBody);
  col.appendChild(card);

  return col;
}

async function loadProducts() {
  // Cambiá estas URLs por las de tu API real
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