// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './Registry.sol';
import './interfaces/IOrderTemplate.sol';
import './libraries/SharedTypes.sol';

contract Pair {
    using SafeMath for uint;

    address public factory;
    address public token0;
    address public token1;
    address public registry;

    SharedTypes.Order[] public orders;

    uint public lastPrice;

    function allOrdersLength() external view returns (uint) {
        return orders.length;
    }

    constructor() {
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1, address _registry) external {
        require(msg.sender == factory, 'Pair: FORBIDDEN');
        token0 = _token0;
        token1 = _token1;
        registry = _registry;
    }

    function buy(uint orderId, uint q, address token, uint maxTotalCost) public {
        SharedTypes.Order memory order = orders[orderId];
        require(token == token0 || token == token1);
        require(int(order.deadline) > int(block.timestamp), 'Pair: Deadline is not valid');

        address templateAddress = Registry(registry).getTemplateAddress(order.templateId);
        uint price = IOrderTemplate(templateAddress).getPrice(q, token, order, token0, token1);
        uint totalCost = price * q;
        require(maxTotalCost >= totalCost);
        
        if(token == token0) {
            uint256 allowance = ERC20(token1).allowance(msg.sender, address(this));
            require(allowance >= totalCost);
            ERC20(token1).transferFrom(msg.sender, address(this), totalCost);
            orders[orderId].amount1 += totalCost;

            ERC20(token0).transfer(msg.sender, q);
            orders[orderId].amount0 -= q;
        }
        else if(token == token1){
            uint256 allowance = ERC20(token0).allowance(msg.sender, address(this));
            require(allowance >= totalCost);
            ERC20(token0).transferFrom(msg.sender, address(this), totalCost);
            orders[orderId].amount0 += totalCost;

            ERC20(token1).transfer(msg.sender, q);
            orders[orderId].amount1 -= q;
        }

        lastPrice = totalCost; //TODO: Set clever Math here
    }
    
    function placeOrder(uint templateId, address _token0, address _token1, uint[] memory params, uint deadline) public {
        require(token0 == _token0 || token1 == _token0, 'Pair: Invalid token pair');
        require(token0 == _token1 || token1 == _token1, 'Pair: Invalid token pair');
        
        require(int(deadline) > int(block.timestamp), 'Pair: Deadline is not valid');
        require(templateId < Registry(registry).allTemplatesLength(), 'Pair: Template is not defined');
        
        SharedTypes.Order memory newOrder = SharedTypes.Order(msg.sender, templateId, params, 0, 0, false, deadline);
        orders.push(newOrder);
    }

    function provideLiquidity(address token, uint amount, uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');

        if(token == token0) {
            uint256 allowance = ERC20(token0).allowance(msg.sender, address(this));
            require(allowance >= amount, 'Pair: Allowance is not enough');
            ERC20(token0).transferFrom(msg.sender, address(this), amount);
            orders[orderId].amount0 += amount;
        }
        else if(token == token1){
            uint256 allowance = ERC20(token1).allowance(msg.sender, address(this));
            require(allowance >= amount, 'Pair: Allowance is not enough');
            ERC20(token1).transferFrom(msg.sender, address(this), amount);
            orders[orderId].amount1 += amount;
        } else {
            revert('Pair: Invalid token pair');
        }
    }

    function removeLiquidity(address token, uint amount, uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');

        if(token == token0) {
            require(orders[orderId].amount0 >= amount, 'Pair: The amount is to large');
            ERC20(token0).transfer(msg.sender, amount);
            orders[orderId].amount0 -= amount;
        }
        else if(token == token1){
            require(orders[orderId].amount1 >= amount, 'Pair: The amount is to large');
            ERC20(token1).transfer(msg.sender, amount);
            orders[orderId].amount1 -= amount;
        } else {
            revert('Pair: Invalid token pair');
        }
    }

    function cancelOrder(uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');
        orders[orderId].isValid = false;
        
        ERC20(token0).transfer(address(msg.sender), orders[orderId].amount0);
        ERC20(token1).transfer(address(msg.sender), orders[orderId].amount1);
    }
}
