/* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const SimpleOneSidedTemplate = artifacts.require("SimpleOneSidedTemplate");
const SimpleTwoSidedTemplate = artifacts.require("SimpleTwoSidedTemplate");

module.exports = function (deployer) {
  deployer.deploy(Registry);
  deployer.deploy(SimpleTwoSidedTemplate);
  deployer.deploy(SimpleOneSidedTemplate);
};
