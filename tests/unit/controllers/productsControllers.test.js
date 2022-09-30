const { expect } = require("chai");
const sinon = require("sinon");
const productsController = require("../../../src/controllers/productsControllers");
const productsService = require("../../../src/services/productsService");
const { products } = require("../../../src/mocks/productsMock");

afterEach(sinon.restore);

describe("Testa a camada Controller", () => {
  it("Testa a função getProducts", async () => {
    const stub = sinon.stub(productsService, "getProducts").resolves({
      type: null,
      message: products,
    });

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    await productsController.getProducts({}, res);
    const [response] = res.json.firstCall.args;

    expect(stub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(response).to.deep.equal(products);
  });

  describe("Testa a função getById", async () => {
    it("Se retorna status 200 quando encontra um produto", async () => {
      const stub = sinon.stub(productsService, "getById").resolves({
        type: null,
        message: products,
      });

      const req = { params: { id: "1" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productsController.getById(req, res);
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(stub.calledWith("1")).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(response).to.deep.equal(products);
    });

    it("Se retorna status 404 quando não encontra um produto", async () => {
      const stub = sinon.stub(productsService, "getById").resolves({
        type: null,
        message: undefined,
      });

      const req = { params: { id: "39" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productsController.getById(req, res);
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(stub.calledWith("39")).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(response).to.deep.equal({
        message: "Product not found",
      });
    });
  });
});
