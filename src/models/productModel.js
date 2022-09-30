const connection = require('./connection');

async function getProducts() {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return products;
}

async function getById(id) {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
}

const insertProducts = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

const updateProducts = async ({ id, name }) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );

  return affectedRows;
};

const deleteProducts = async (id) => {
  const [{ affectedRows }] = await connection.deleteProducts(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return affectedRows;
};

module.exports = {
  getProducts,
  getById,
  insertProducts,
  updateProducts,
  deleteProducts,
};
