const sinon = require('sinon');
const chai = require('chai');
const expect  = chai.expect;
const productsModel = require('../../../src/models/productModel');
const productsService = require('../../..//src/services/productsService');
const { products, newProduct } = require("../../../src/mocks/productsMock");

afterEach(sinon.restore);

describe('Testa a camada Services', () => {
  it('Testa a função getProducts', async () => {
    const stub = sinon.stub(productsModel, 'getProducts').resolves(products);
    const response = await productsService.getProducts();

    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal({
      type: null,
      message: products,
    });
  });

  it('Testa a função getById', async () => {
    const stub = sinon.stub(productsModel, 'getById').resolves(products);
    const response = await productsService.getById('1');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith('1')).to.be.true;
    expect(response).to.deep.equal({
      type: null,
      message: products,
    });
  });

  
  it("Testa a função insertProducts", async () => {
    const { name } = products
    const stub = sinon.stub(productsModel, "insertProducts").resolves(products);
    const response = await productsService.insertProducts({ name });

    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal({
      type: null,
      message: newProduct,
    });
  });
});