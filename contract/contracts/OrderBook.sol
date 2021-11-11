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
        int linked_order_id;
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
        
        uint price = getPrice(order, q);
        uint interpolated_price = price * q;
        
        require(max_price_expected >= interpolated_price);
        orders[order_id].amount -= q;
        
        uint256 allowance = ERC20(pairs[order.pair_address].token2).allowance(msg.sender, address(this));
        require(allowance >= interpolated_price);
        
        if(order.order_type == OrderType.ONE_SIDED){
            ERC20(pairs[order.pair_address].token2).transferFrom(msg.sender, address(order.bid_owner), interpolated_price);
        } else {
            orders[uint(order.linked_order_id)].amount += interpolated_price;
        }
        ERC20(order.pair_address).transfer(msg.sender, q);

        pairs[order.pair_address].lastPrice = price; //TODO: Set clever Math here
    }
    
    function getPrice(Order memory order, uint q) public pure returns(uint interpolated_price){
        for (uint i=4; i>=0; i--) {
            if (q>order.x[i]) {
                if(i == 4) revert();
                uint ip = (order.p[i+1]-order.p[i])*(q-order.x[i])/(order.x[i+1]-order.x[i]) + order.p[i];
                uint multiplier = order.amount/order.initial_amount;
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
        
        Order memory newOrder = Order(token1, x, p, deadline, OrderType.ONE_SIDED, true, msg.sender, amount, amount, int(-1));
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

    function linkOrders(uint order1_id, uint order2_id) public {
        require(orders[order1_id].bid_owner == msg.sender);
        require(orders[order2_id].bid_owner == msg.sender);

        require(orders[order1_id].pair_address == pairs[orders[order2_id].pair_address].token2);
        require(orders[order2_id].pair_address == pairs[orders[order1_id].pair_address].token2);

        orders[order1_id].linked_order_id = int(order2_id);
        orders[order1_id].order_type = OrderType.TWO_SIDED;

        orders[order2_id].linked_order_id = int(order1_id);
        orders[order2_id].order_type = OrderType.TWO_SIDED;
    }
}