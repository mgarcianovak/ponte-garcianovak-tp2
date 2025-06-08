const getAll = async () => {
  try {
    const url = `http://localhost:3001/product`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

const getByCategory = async (category) => {
  try {
    const url = `http://localhost:3001/product/category/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

const getById = async (id) => {
  try {
    const url = `http://localhost:3001/product/id/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = {
  getAllProducts: async () => await getAll(),

  getProductsByCategory: async (category) => await getByCategory(category),

  getProductById: async (id) => await getById(id)
};
