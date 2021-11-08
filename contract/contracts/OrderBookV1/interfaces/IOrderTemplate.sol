pragma solidity >=0.7.0 <0.9.0;

interface IOrderTemplate {
  function getPrice(uint q, address token) external view returns (uint price);
  function assetValueChanged(uint change, address token) external;
}