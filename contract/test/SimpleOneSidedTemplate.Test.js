/* eslint-disable no-undef */
const SimpleOneSidedTemplate = artifacts.require("SimpleOneSidedTemplate");

contract("SimpleOneSidedTemplate", (accounts) => {
  let simpleOneSidedTemplate;

  it("Value Test 1", async () => {
    simpleOneSidedTemplate = await SimpleOneSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [0, 4, 2, 4, 6, 8, 10, 20, 30, 40];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: 40,
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    const price = await simpleOneSidedTemplate.getPrice(
      3,
      token0,
      order,
      token0,
      token1
    );
    assert.equal(parseInt(price), 15, "This test should not fail");
  });

  it("SimpleOneSidedTemplate: Not enogth liquidity", async () => {
    simpleOneSidedTemplate = await SimpleOneSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [0, 4, 2, 4, 6, 8, 10, 20, 30, 40];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: 40,
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    try {
      await simpleOneSidedTemplate.getPrice(60, token0, order, token0, token1);
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert SimpleOneSidedTemplate: Not enogth liquidity",
        "This test should not fail"
      );
    }
  });

  it("SimpleOneSidedTemplate: TOKEN is not valid test 1", async () => {
    simpleOneSidedTemplate = await SimpleOneSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [1];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: 40,
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    try {
      await simpleOneSidedTemplate.getPrice(60, token0, order, token0, token1);
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert SimpleOneSidedTemplate: TOKEN is not valid",
        "This test should not fail"
      );
    }
  });

  it("SimpleOneSidedTemplate: TOKEN is not valid test 2", async () => {
    simpleOneSidedTemplate = await SimpleOneSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [0];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: 40,
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    try {
      await simpleOneSidedTemplate.getPrice(60, token1, order, token0, token1);
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert SimpleOneSidedTemplate: TOKEN is not valid",
        "This test should not fail"
      );
    }
  });
});
