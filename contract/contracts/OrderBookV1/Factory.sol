// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import './Pair.sol';

contract Factory {
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
    address public registry;

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
    
    constructor() public {
        registry = msg.sender;
    }

    function createPair(address tokenA, address tokenB) external returns (address) {
        require(tokenA != tokenB, 'Factory: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'Factory: ZERO_ADDRESS');
        
        require(getPair[token0][token1] == address(0), 'Factory: PAIR_EXISTS');
        
        address pair = new Pair();
        Pair(pair).initialize(token0, token1, registry);

        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        
        return pair;
    }
}