/* eslint-disable no-undef */
const SimpleTwoSidedTemplate = artifacts.require("SimpleTwoSidedTemplate");
const { toToken } = require("./helpers");

contract("SimpleTwoSidedTemplate", (accounts) => {
  let simpleTwoSidedTemplate;

  it("Value Test 1 TOKEN0", async () => {
    simpleTwoSidedTemplate = await SimpleTwoSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [
      4,
      ...toToken([2, 4, 6, 8]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([2, 4, 6, 8]),
    ];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: toToken(40),
      amount1: toToken(8),
      isValid: true,
      deadline: 0,
    };

    const price = await simpleTwoSidedTemplate.getPrice(
      toToken(5),
      token0,
      order,
      token0,
      token1
    );
    assert.equal(parseInt(price), toToken(25), "This test should not fail");
  });

  it("SimpleTwoSidedTemplate: Not enogth liquidity TOKEN0", async () => {
    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [
      4,
      ...toToken([2, 4, 6, 8]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([2, 4, 6, 8]),
    ];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: toToken(40),
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    try {
      await simpleTwoSidedTemplate.getPrice(
        toToken(60),
        token0,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert SimpleTwoSidedTemplate: Not enogth liquidity",
        "This test should not fail"
      );
    }
  });

  it("Value Test 1 TOKEN1", async () => {
    simpleTwoSidedTemplate = await SimpleTwoSidedTemplate.deployed();

    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [
      4,
      ...toToken([2, 4, 6, 8]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([2, 4, 6, 8]),
    ];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: toToken(40),
      amount1: toToken(30),
      isValid: true,
      deadline: 0,
    };

    const price = await simpleTwoSidedTemplate.getPrice(
      toToken(25),
      token1,
      order,
      token0,
      token1
    );
    assert.equal(parseInt(price), toToken(5), "This test should not fail");
  });

  it("SimpleTwoSidedTemplate: Not enogth liquidity TOKEN1", async () => {
    const token0 = accounts[1];
    const token1 = accounts[2];

    const params = [
      4,
      ...toToken([2, 4, 6, 8]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([2, 4, 6, 8]),
    ];
    const order = {
      owner: accounts[0],
      templateId: 0,
      params,
      amount0: toToken(40),
      amount1: 0,
      isValid: true,
      deadline: 0,
    };

    try {
      await simpleTwoSidedTemplate.getPrice(
        toToken(9),
        token1,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert SimpleTwoSidedTemplate: Not enogth liquidity",
        "This test should not fail"
      );
    }
  });
});
