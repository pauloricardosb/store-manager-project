const salesService = require('../services/salesService');

const insertSales = async (request, response) => {
  try {
    const sales = request.body;
    const { type, message } = await salesService.insertSales(sales);

    if (type) {
      return response.status(type).json({ message });
    }

    response
      .status(201)
      .json(message);
  } catch (err) {
    response.status(400).end();
  }
};

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  getAllSales,
  getById,
};