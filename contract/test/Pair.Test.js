// /* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const Pair = artifacts.require("Pair");
const CustomERC20Token = artifacts.require("CustomERC20Token");
const { defaultErrMsg, toToken } = require("./helpers");

contract("Pair", (accounts) => {
  let registryInstance,
    tokenA,
    tokenB,
    pairAddress,
    pair,
    snapshot,
    length,
    order;
  const marketMaker = accounts[0];
  const bob = accounts[1];

  it("Set Up", async () => {
    registryInstance = await Registry.deployed();
    tokenA = await CustomERC20Token.new("My Token A", "TKNA", {
      from: accounts[3],
    });
    tokenB = await CustomERC20Token.new("My Token B", "TKNB", {
      from: accounts[3],
    });
    await registryInstance.createPair(tokenA.address, tokenB.address);

    pairAddress = await registryInstance.allPairs(0);
    pair = await Pair.at(pairAddress);

    await tokenA.unlimitedMint(marketMaker, 500);
    await tokenB.unlimitedMint(marketMaker, 500);
    await tokenB.unlimitedMint(bob, 500);
  });

  it("Place Order", async () => {
    const params = [
      4,
      ...toToken([2, 4, 6, 8]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([10, 20, 30, 40]),
      ...toToken([2, 4, 6, 8]),
    ];
    const deadline = parseInt(await tokenA.getBlockchainParams()) + 10000000;

    length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 0, defaultErrMsg);

    await pair.placeOrder(1, params, deadline, {
      from: marketMaker,
    });

    length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 1, defaultErrMsg);

    order = await pair.orders(0);
    assert.equal(order.amount0, toToken(0), defaultErrMsg);
    assert.equal(order.amount1, toToken(0), defaultErrMsg);
  });

  it("Provide Liquidity Failes", async () => {
    try {
      await pair.provideLiquidity(tokenA.address, 8, 0, { from: accounts[7] });
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert Pair: Is not an order owner -- Reason given: Pair: Is not an order owner.",
        defaultErrMsg
      );
    }
  });

  it("Provide Liquidity Failes", async () => {
    try {
      await pair.provideLiquidity(tokenA.address, 8, 0, { from: marketMaker });
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert Pair: Allowance is not enough -- Reason given: Pair: Allowance is not enough.",
        defaultErrMsg
      );
    }
  });

  it("Provide Liquidity", async () => {
    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([500, 500, 0, 0]), defaultErrMsg);

    await tokenA.increaseAllowance(pairAddress, toToken(8), {
      from: marketMaker,
    });
    await tokenB.increaseAllowance(pairAddress, toToken(40), {
      from: marketMaker,
    });

    await pair.provideLiquidity(tokenA.address, toToken(8), 0, {
      from: marketMaker,
    });
    await pair.provideLiquidity(tokenB.address, toToken(40), 0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([492, 460, 8, 40]), defaultErrMsg);

    order = await pair.orders(0);
    assert.equal(order.amount0, toToken(8), defaultErrMsg);
    assert.equal(order.amount1, toToken(40), defaultErrMsg);
  });

  it("Buy", async () => {
    snapshot = [
      (await tokenA.balanceOf(bob)).toString(),
      (await tokenB.balanceOf(bob)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([0, 500]), defaultErrMsg);

    assert.equal(await pair.token0.call(), tokenA.address, defaultErrMsg);
    assert.equal(await pair.token1.call(), tokenB.address, defaultErrMsg);

    await tokenB.increaseAllowance(pairAddress, toToken(30), {
      from: bob,
    });

    await pair.buy(0, toToken(6), tokenA.address, toToken(32), {
      from: bob,
    });

    order = await pair.orders(0);
    assert.equal(order.amount0, toToken(2), defaultErrMsg);
    assert.equal(order.amount1, toToken(70), defaultErrMsg);

    snapshot = [
      (await tokenA.balanceOf(bob)).toString(),
      (await tokenB.balanceOf(bob)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([6, 470, 2, 70]), defaultErrMsg);
  });

  it("Remove Liquidity", async () => {
    await pair.removeLiquidity(tokenA.address, toToken(1), 0, {
      from: marketMaker,
    });

    await pair.removeLiquidity(tokenB.address, toToken(69), 0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([493, 529]), defaultErrMsg);
  });

  it("Cancel Order", async () => {
    await pair.cancelOrder(0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([494, 530]), defaultErrMsg);
  });
});
