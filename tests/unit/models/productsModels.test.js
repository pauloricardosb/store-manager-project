const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const productsModel = require("../../../src/models/productModel");
const {
  productsMock,
  products,
  idProduct,
} = require("../../../src/mocks/productsMock");
const connection = require('../../../src/models/connection');


afterEach(sinon.restore);

describe('Testa a camada Model', () => {

  it('Testa a função getProducts', async () => {
    const response = sinon.stub(connection, "execute").resolves(productsMock);
    const result = await productsModel.getProducts();

    expect(response.calledOnce).to.be.true;
    expect(result).to.deep.equal(products);
  });

it("Testa a função getById", async () => {
  const response = sinon.stub(connection, "execute").resolves(idProduct);

  const results = await productsModel.getById("1");
  const [, [paramId]] = response.firstCall.args;

  expect(response.calledOnce).to.be.true;
  expect(paramId).to.equal("1");
  expect(results).to.deep.equal(products);
});
});