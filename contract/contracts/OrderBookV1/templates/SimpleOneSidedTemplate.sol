pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interfaces/IOrderTemplate.sol';
import '../Pair.sol';

contract SimpleOneSidedTemplate is IOrderTemplate {

    using SafeMath for uint;
    
    function getPrice(uint q, address token, Order order) external view returns (uint price) {
        if(token == token0){
            return q * _priceParam; 
        } else if(token == token1){
            return q / _priceParam;
        }
        revert('SimpleTwoSidedTemplate: TOKEN not valid');
    }

}