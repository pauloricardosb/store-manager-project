const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");
const {
  newSale,
  modelSale,
  modelSaleObj,
  newSaleById,
  newSaleByIdArray,
} = require("../../../src/mocks/salesMock");

describe("Testa a camada model de Sales", () => {
  afterEach(sinon.restore);

  it("Testando a função InsertSales", async () => {
    sinon.stub(connection, "execute").resolves([{ insertId: 7 }]);

    const result = await salesModel.insertSales(newSale);

    expect(result).to.equal(undefined);
  });

  it("Testando a função InsertSalesById", async () => {
    sinon.stub(connection, "execute").resolves([{ insertId: 7 }]);

    const result = await salesModel.insertSalesById(newSale);

    expect(result).to.deep.equal(7);
  });
  
  it("Testa a função GetAllSales", async () => {
    sinon.stub(connection, "execute").resolves(modelSale);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(modelSaleObj);
  });
  
  it("Testa a função getById", async () => {
    const response = sinon
      .stub(connection, "execute")
      .resolves(newSaleByIdArray);

    const results = await salesModel.getById("7");
    const [, [paramId]] = response.firstCall.args;

    expect(response.calledOnce).to.be.true;
    expect(paramId).to.equal("7");
    expect(results).to.deep.equal(newSaleById);
  });
});
