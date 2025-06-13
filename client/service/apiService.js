const API_BASE_URL = "http://localhost:3001/api";

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error("Error al obtener productos por categoría");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/id/${id}`);
    if (!response.ok) throw new Error("Error al obtener productos por id");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}