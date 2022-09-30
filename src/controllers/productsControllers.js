const productsService = require('../services/productsService');

async function getProducts(_req, res) {
  const { message } = await productsService.getProducts();
  res.status(200).json(message);
}

async function getById(req, res) {
  const { id } = req.params;
  const { message } = await productsService.getById(id);
  if (!message) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  res.status(200).json(message);
}

async function insertProducts(req, res) {
  const { type, message } = await productsService.insertProducts(req.body);

  if (type) return null;
  res.status(201).json(message);
}

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProducts({ id, name });

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProducts(id);

  if (type) return res.status(404).json({ message });

  res.sendStatus(204);
};

module.exports = {
  getProducts,
  getById,
  insertProducts,
  updateProducts,
  deleteProducts,
};
