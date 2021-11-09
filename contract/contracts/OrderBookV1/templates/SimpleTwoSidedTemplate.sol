// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interfaces/IOrderTemplate.sol';
import '../libraries/SharedTypes.sol';
import '../Pair.sol';

contract SimpleTwoSidedTemplate is IOrderTemplate {

    using SafeMath for uint;
    
    // Always from token0 to token1
    // [curveLength; ...curveLength x0; ...curveLength p0; ...curveLength x1; ...curveLength p1]
    function getPrice(uint q, address token, SharedTypes.Order order, address token0, address token1) external view returns (uint price) {
        uint curveLength = order.params[0];
        uint start = token == token0 ? 1: curveLength * 2 + 1;
        for (uint i=curveLength-1; i>=0; i--) {
            uint x_i = order.params[start+i];
            if (q > x_i) {
                require(i != curveLength-1, 'SimpleTwoSidedTemplate: Not enogth liquidity');
                uint x_ii = order.params[start+i+1];
                uint p_i = order.params[start+curveLength+i];
                uint p_ii = order.params[start+curveLength+i+1];

                uint ip = (p_ii-p_i)*(q-x_i)/(x_ii-x_i) + p_i;
                // TODO: multiplier
                // uint multiplier = order.amount/order.initial_amount;
                // return ip*multiplier;
                return ip;
            }
        }
    }
}