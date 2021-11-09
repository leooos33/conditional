// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interfaces/IOrderTemplate.sol';
import '../libraries/SharedTypes.sol';
import '../Pair.sol';

contract SimpleOneSidedTemplate is IOrderTemplate {

    using SafeMath for uint;
    
    // params description
    // [order type (0/1); curveLength; ...curveLength x; ...curveLength p]
    function getPrice(uint q, address token, SharedTypes.Order order, address token0, address token1) external view returns (uint price) {
        uint orderType = order.params[0]; 
        require(orderType == 0 && token == token0 || orderType == 1 && token == token1, 'SimpleOneSidedTemplate: TOKEN is not valid');
        
        uint curveLength = order.params[1];
        for (uint i=curveLength-1; i>=0; i--) {
            uint x_i = order.params[2+i];
            if (q > x_i) {
                require(i != curveLength-1, 'SimpleOneSidedTemplate: Not enogth liquidity');
                uint x_ii = order.params[3+i];
                uint p_i = order.params[2+curveLength+i];
                uint p_ii = order.params[3+curveLength+i];

                uint ip = (p_ii-p_i)*(q-x_i)/(x_ii-x_i) + p_i;
                // TODO: multiplier
                // uint multiplier = order.amount/order.initial_amount;
                // return ip*multiplier;
                return ip;
            }
        }
    }
}