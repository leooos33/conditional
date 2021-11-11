// /* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const Pair = artifacts.require("Pair");
const CustomERC20Token = artifacts.require("CustomERC20Token");

contract("Registry", (accounts) => {
  let registryInstance;
  let tokenA;
  let tokenB;
  let pairAddress;
  let pair;
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
    await tokenA.unlimitedMint(bob, 500);
  });

  it("Place Order", async () => {
    const params = [
      4,
      ...[2, 4, 6, 8],
      ...[10, 20, 30, 40],
      ...[10, 20, 30, 40],
      ...[2, 4, 6, 8],
    ];
    const deadline = parseInt(await tokenA.getBlockchainParams()) + 10000000;

    let length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 0, "This test should not fail");

    await pair.placeOrder(1, tokenA.address, tokenB.address, params, deadline);

    length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 1, "This test should not fail");
  });

  it("Provide Liquidity", async () => {
    await tokenA.increaseAllowance(pairAddress, 8, { from: marketMaker });
    await tokenB.increaseAllowance(pairAddress, 40, { from: marketMaker });
  });
});
