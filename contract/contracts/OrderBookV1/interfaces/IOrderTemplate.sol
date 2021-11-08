pragma solidity >=0.7.0 <0.9.0;

import '../Pair.sol';

interface IOrderTemplate {
  function getPrice(uint q, address token, Order order) external view returns (uint price);
}