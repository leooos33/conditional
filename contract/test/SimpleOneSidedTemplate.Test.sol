// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderBookV1/templates/SimpleOneSidedTemplate.sol";
import "../contracts/OrderBookV1/templates/SimpleTwoSidedTemplate.sol";
import "../contracts/OrderBookV1/libraries/SharedTypes.sol";

contract TestTemplates {

    SimpleOneSidedTemplate meta0;
    function beforeAll () public {
        meta0 = SimpleOneSidedTemplate(DeployedAddresses.SimpleOneSidedTemplate());
    }
    address token0 = 0x0000000000000000000000000000000000000001;
    address token1 = 0x0000000000000000000000000000000000000010;

    // "This test should Fail" SimpleOneSidedTemplate: TOKEN is not valid.
    function test1() public {
        uint[] memory params = new uint[](1);
        params[0] = uint(1);
        uint amount = 6;
        SharedTypes.Order memory order = SharedTypes.Order(msg.sender, 0, params, amount, 0, true, 0);
        SimpleOneSidedTemplate template = new SimpleOneSidedTemplate();
        template.getPrice(2, token0, order, token0, token1);
    }

    function test2() public {
        uint[] memory params = new uint[](10);
        params[0] = uint(0);
        params[1] = uint(4);
        // x
        params[2] = uint(2);
        params[3] = uint(4);
        params[4] = uint(6);
        params[5] = uint(8);
        // p
        params[6] = uint(10);
        params[7] = uint(20);
        params[8] = uint(30);
        params[9] = uint(40);
        uint amount = 40;
        SharedTypes.Order memory order = SharedTypes.Order(msg.sender, 0, params, amount, 0, true, 0);
        SimpleOneSidedTemplate template = new SimpleOneSidedTemplate();
        uint price = template.getPrice(3, token0, order, token0, token1);
        Assert.equal(price, 15, "This test should not fail");
    }

    // "This test should Fail" SimpleOneSidedTemplate: Not enogth liquidity
    function test3() public {
        uint[] memory params = new uint[](10);
        params[0] = uint(0);
        params[1] = uint(4);
        // x
        params[2] = uint(2);
        params[3] = uint(4);
        params[4] = uint(6);
        params[5] = uint(8);
        // p
        params[6] = uint(10);
        params[7] = uint(20);
        params[8] = uint(30);
        params[9] = uint(40);
        uint amount = 40;
        SharedTypes.Order memory order = SharedTypes.Order(msg.sender, 0, params, amount, 0, true, 0);
        SimpleOneSidedTemplate template = new SimpleOneSidedTemplate();
        template.getPrice(50, token0, order, token0, token1);
    }
}
