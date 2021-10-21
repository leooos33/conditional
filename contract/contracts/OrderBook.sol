// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract OrderBook {
    
    using SafeMath for uint;

    enum OrderType{ ONE_SIDED, TWO_SIDED }
    
    struct Order {
        address pair_address;
        uint[] x;
        uint[] p;
        uint deadline;
        OrderType order_type;
        bool is_valid;
        address bid_owner;
        uint amount;
        uint initial_amount;
    }
    
    mapping(uint => Order) public orders;

    struct Pair { 
        address token2;
        uint lastPrice;
    }

    mapping(address => Pair) public pairs;

    function isOrderValid(uint id) public view returns(bool) {
        require(id < lastOrderId);
        return orders[id].is_valid;
    }
    
    uint private lastOrderId = 0;
    
    function getLastOrderId() public view returns(uint) {
        return lastOrderId;
    }

    function buy(uint order_id, uint q, uint max_price_expected) public {
        Order memory order = orders[order_id];
        require(order.is_valid == true);
        require(int(order.deadline) > int(block.timestamp), 'Deadline is not valid');
        require(order.amount - q >= 0);
        uint interpolated_price = getPrice(order, q);
        
        require(max_price_expected >= interpolated_price);
        orders[order_id].amount -= q;
        
        uint256 allowance = ERC20(pairs[order.pair_address].token2).allowance(msg.sender, address(this));
        require(allowance >= interpolated_price);

        ERC20(pairs[order.pair_address].token2).transferFrom(msg.sender, address(order.bid_owner), interpolated_price);
        ERC20(order.pair_address).transfer(msg.sender, q);

        pairs[order.pair_address].lastPrice = interpolated_price; // Set clever Math here
    }
    
    function getPrice(Order memory order, uint q) public pure returns(uint interpolated_price){
        for (uint i=4; i>=0; i--) {
            if (q>order.x[i]) {
                if(i == 4) revert();
                uint ip = ((order.x[i+1]-order.x[i])*(q - order.p[i])/(order.p[i+1]-order.p[i]))+order.x[i];
                uint multiplier = order.initial_amount/order.amount;
                return ip*multiplier;
            }
        }
    }
    
    function placeOrder(address token1, address token2, uint[] memory x, uint[] memory p, uint deadline) public returns(uint) {
        require(x.length == 5, "X is not valid");
        uint lastId = 0;
        for (uint i=1; i<x.length; i++) {
            require(x[i]>=x[lastId]);
            lastId ++;
        }

        require(p.length == 5, "P is not valid");
        require(int(deadline) > int(block.timestamp), 'Deadline is not valid');

        if(pairs[token1].token2 == address(0x0)) {
            pairs[token1] = Pair(token2, 0);
        }

        uint amount = x[4];
        uint256 allowance = ERC20(token1).allowance(msg.sender, address(this));
        require(allowance >= amount);
        ERC20(token1).transferFrom(msg.sender, address(this), amount);
        
        Order memory newOrder = Order(token1, x, p, deadline, OrderType.ONE_SIDED, true, msg.sender, amount, amount);
        orders[lastOrderId] = newOrder;
        lastOrderId++;
        return (lastOrderId-1);
    }
    
    function cancelOrder(uint id) public{
        require(orders[id].bid_owner == msg.sender);
        require(orders[id].amount >= 0);
        orders[id].is_valid = false;
        
        ERC20(orders[id].pair_address).transfer(address(msg.sender), orders[id].amount);
    }
}