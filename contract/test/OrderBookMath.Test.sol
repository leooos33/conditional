// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderBook.sol";

contract TestOrderBook {

    OrderBook meta;
    function beforeAll () public {
        meta = OrderBook(DeployedAddresses.OrderBook());
    }

    function test1() public {
        uint[] memory x = new uint[](5);
        x[0] = uint(2);
        x[1] = uint(4);
        x[2] = uint(6);
        x[3] = uint(8);
        x[4] = uint(10);
        uint[] memory p = new uint[](5);
        p[0] = uint(10);
        p[1] = uint(33);
        p[2] = uint(30);
        p[3] = uint(40);
        p[4] = uint(50);
        OrderBook.Order memory newOrder = OrderBook.Order(msg.sender, x, p, 0, OrderBook.OrderType.ONE_SIDED, true, msg.sender, 10, 10, int(-1));

        uint interpolated_price = meta.getPrice(newOrder, 3);

        Assert.equal(interpolated_price, 21, "This test should not fail");
    }
}
