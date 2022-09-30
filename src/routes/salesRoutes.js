const express = require('express');
const { insertSales, getAllSales, getById } = require('../controllers/salesControllers');
const { salesValidations } = require('../middlewares/salesValidations');

const sales = express.Router();

sales.post('/', salesValidations, insertSales);
sales.get('/', getAllSales);
sales.get('/:id', getById);

module.exports = sales;