const express = require('express');
const {
  getProducts,
  getById,
  insertProducts,
  updateProducts,
  deleteProducts,
} = require('../controllers/productsControllers');
const hasName = require('../middlewares/productsValidations');

const products = express.Router();

products.get('/', getProducts);
products.get('/:id', getById);
products.post('/', hasName, insertProducts);
products.put('/:id', hasName, updateProducts);
products.delete('/:id', deleteProducts);

module.exports = products;