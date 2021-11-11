/* eslint-disable no-undef */
const OrderBook = artifacts.require("OrderBook");
const Registry = artifacts.require("Registry");
const SimpleOneSidedTemplate = artifacts.require("SimpleOneSidedTemplate");
const SimpleTwoSidedTemplate = artifacts.require("SimpleTwoSidedTemplate");
// const CustomERC20Token = artifacts.require("CustomERC20Token");

module.exports = function (deployer) {
  deployer.deploy(OrderBook);
  deployer.deploy(Registry);
  deployer.deploy(SimpleTwoSidedTemplate);
  deployer.deploy(SimpleOneSidedTemplate);
};
