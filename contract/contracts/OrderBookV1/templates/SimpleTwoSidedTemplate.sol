pragma solidity >=0.7.0 <0.9.0;

import './IOrderTemplate.sol';

contract SimpleTwoSidedTemplate is IOrderTemplate {
    
    constructor(address _token0, address _token1) {
        token0 = _token0;
        token1 = _token1;
    }

    function initialized(uitn _priceParam) public {
        priceParam = _priceParam;
    }
    
    uitn priceParam;
    address token0;
    address token1;
    uint ballance0 = 0;
    uint ballance1 = 0;
    
    function getPrice(uint q, address token) external view returns (uint price) {
        if(token == token0){
            return q * _priceParam; 
        } else if(token == token1){
            return q / _priceParam;
        }
        revert('SimpleTwoSidedTemplate: TOKEN not valid');
    }
    
    function assetValueChanged(uint change, address token) public {
        if(token == token0){
            ballance0 = ballance0 + change;
        } else if(token == token1){
            ballance1 = ballance1 + change;
        }
        revert('SimpleTwoSidedTemplate: TOKEN not valid');
    }
}