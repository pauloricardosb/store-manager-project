const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon");
const salesModel = require("../../../src/models/salesModel");
const productsModel = require("../../../src/models/productModel");
const salesService = require("../../../src/services/salesService");
const { newSale, newSaleById, newSaleObj } = require("../../../src/mocks/salesMock");

afterEach(sinon.restore);

describe("Testa a camada services de Sales", () => {
  it("Testa a função GetById", async () => {
    const stub = sinon.stub(salesModel, "getById").resolves(newSaleById);

    const response = await salesService.getById("7");

    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal(newSaleObj);
  });

  it("Testa a função GetAllSales", async () => {
    const stub = sinon.stub(salesModel, "getAllSales").resolves(newSale);
    const response = await salesService.getAllSales();
  
    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal(newSale);
  });

  it("Se retorna erro para produto inexistente", async () => {
      const stub = sinon.stub(productsModel, "getById").resolves(undefined);
      const stubSalesInsert = sinon.stub(salesModel, 'insertSales').resolves(1);
      const response = await salesService.insertSales([
        { productId: 1, quantity: 5 },
      ]);
  
      expect(stub.calledOnce).to.be.true;
      expect(response).to.deep.equal({
        type: 404,
        message: "Product not found",
      });
      expect(stubSalesInsert.called).to.be.false;
    });
});
