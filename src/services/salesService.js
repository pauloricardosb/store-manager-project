const salesModel = require('../models/salesModel');
const productsModel = require('../models/productModel');

const searchProduct = async (sales) => {
  const searchId = await Promise.all(
    sales.map(({ productId }) => productsModel.getById(productId)),
  );

  if (searchId.some((id) => id === undefined)) {
    return { type: 404, message: 'Product not found' };
  }
};

const insertSales = async (sales) => {
  const newSale = await searchProduct(sales);
  if (newSale) return newSale;

  const saleId = await salesModel.insertSalesById();
  await salesModel.insertSales(sales, saleId);

  return { type: null, message: { id: saleId, itemsSold: sales } };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();

  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);

  if (result.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }

  return { type: null, message: result };
};

module.exports = {
  insertSales,
  getAllSales,
  getById,
};
