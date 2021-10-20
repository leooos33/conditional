/* eslint-disable no-undef */
const OrderBook = artifacts.require("OrderBook");
// const CustomERC20Token = artifacts.require("CustomERC20Token");

module.exports = function(deployer) {
  // deployer.deploy(CustomERC20Token, "TokenA", "TA");
  deployer.deploy(OrderBook);
};
