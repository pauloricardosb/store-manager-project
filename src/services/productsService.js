const productsModel = require('../models/productModel');

async function getProducts() {
  const products = await productsModel.getProducts();
  return {
    type: null,
    message: products,
  };
}

async function getById(id) {
  const product = await productsModel.getById(id);
  return {
    type: null,
    message: product,
  };
}

const insertProducts = async ({ name }) => {
  const id = await productsModel.insertProducts(name);
  return { type: null, message: { id, name } };
};

const updateProducts = async (data) => {
  const affectedRows = await productsModel.updateProducts(data);

  if (!affectedRows) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: data };
};

const deleteProducts = async (id) => {
  const affectedRows = await productsModel.deleteProducts(id);

  if (!affectedRows) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  getProducts,
  getById,
  insertProducts,
  updateProducts,
  deleteProducts,
};
