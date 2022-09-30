const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const modelSale = [
  {
    productId: 1,
    quantity: 1,
  },
];

const modelSaleObj = {
  productId: 1,
  quantity: 1,
};

const newSaleById = {
  type: null,
  message: {
    id: 7,
    itemsSold: newSale,
  },
};

const newSaleByIdArray = [
  {
    type: null,
    message: {
      id: 7,
      itemsSold: newSale,
    },
  },
];

const notFound = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

const invalidSale = {
  type: 'FIELD_REQUIRED',
  message: 'Field required',
};

const newSaleObj = {
  message: {
    type: null,
    message: { id: 7, itemsSold: newSale },
  },
  type: null,
};

module.exports = {
  newSale,
  newSaleById,
  notFound,
  invalidSale,
  modelSale,
  modelSaleObj,
  newSaleObj,
  newSaleByIdArray,
};
