const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon");

const salesService = require("../../../src/services/salesService");
const salesController = require("../../../src/controllers/salesControllers");
const {
  newSale,
  newSaleById,
  invalidSale,
} = require("../../../src/mocks/salesMock");

const { message } = newSaleById;
const { message: invalidMessage } = invalidSale;

describe("Testando a camada controller de Sales", () => {
  afterEach(sinon.restore);

  it("Testando a função insertSales", async () => {
    const req = { body: newSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(message);
    sinon.stub(salesService, 'insertSales').resolves({ type: null, message });

    await salesController.insertSales(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(message)).to.be.true;
  });

  it("Testando se insertSales retorna erro", async () => {
    const req = { body: newSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(invalidMessage);
    sinon.stub(salesService, 'insertSales').resolves(invalidSale);

    await salesController.insertSales(req, res);

    expect(res.status.calledWith(400)).to.be.false;
    expect(res.json.calledWith(invalidMessage));
  });

  it("Testa função GetAllSales", async () => {
      const stub = sinon.stub(salesService, 'getAllSales').resolves(newSale);

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await salesController.getAllSales({}, res)
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(response).to.deep.equal(newSale);
  });

    it("Testa função GetById", async () => {
      const stub = sinon.stub(salesService, "getById").resolves({
        type: null,
        message: newSaleById,
      });

      const req = { params: { id: "7" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await salesController.getById(req, res);
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(stub.calledWith("7")).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(response).to.deep.equal(newSaleById);
    });
});
