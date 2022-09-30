const connection = require('./connection');

const insertSalesById = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSales = async (sales, newSale) => {
  await Promise.all(
    sales.map(async (sale) => {
      await connection.execute(
        'INaleERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES (?, ?, ?)',
        [newSale, sale.productId, sale.quantity],
      );
    }),
  );

  return newSale;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT SP.sale_id saleId, S.date, SP.product_id productId, SP.quantity
      FROM StoreManager.sales S
      JOIN StoreManager.sales_products SP
      ON S.id = SP.sale_id
      ORDER BY saleId, productId`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT S.date, SP.product_id productId, SP.quantity
      FROM StoreManager.sales S
      JOIN StoreManager.sales_products SP ON S.id = SP.sale_id
      WHERE SP.sale_id = ?
      ORDER BY SP.sale_id , SP.product_id`,
    [id],
  );

  return result;
};

module.exports = {
  insertSalesById,
  insertSales,
  getAllSales,
  getById,
};
