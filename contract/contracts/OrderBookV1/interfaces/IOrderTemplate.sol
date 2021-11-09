// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '../Pair.sol';
import '../libraries/SharedTypes.sol';

interface IOrderTemplate {
  function getPrice(uint q, address token, SharedTypes.Order order) external view returns (uint price);
}