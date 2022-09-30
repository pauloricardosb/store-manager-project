const Thor = 'Martelo de Thor';

const productsMock = [
  {
    id: 1,
    name: Thor,
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const products = {
    id: 1,
    name: Thor,
};

const newProduct = {
  id: {
    id: 1,
    name: Thor,
  },
  name: Thor,
};

const idProduct = [
  [
    {
      id: 1,
      name: Thor,
    },
  ],
];

module.exports = {
  productsMock,
  products,
  idProduct,
  newProduct,
};
