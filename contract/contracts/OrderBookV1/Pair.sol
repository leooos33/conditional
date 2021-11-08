pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Pair {
    using SafeMath for uint;

    address public factory;
    address public token0;
    address public token1;

    constructor() public {
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'Pair: FORBIDDEN');
        token0 = _token0;
        token1 = _token1;
    }
    
    mapping(uint => Order) public orders;
    
    function buy(uint order_id, uint q, address token) public {
        require(token == token0 || token == token1);
        // do some magic here
        // getPrice check if enogth
        // wifdraw call template contract
    }
    
    function placeOrder(uint templateId) public {
        // require to be in registry

    }

    function initialized(uint orderId) public {
        
    }
}
