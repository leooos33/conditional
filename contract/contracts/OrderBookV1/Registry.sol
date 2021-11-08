pragma solidity >=0.7.0 <0.9.0;

import './SimpleTwoSidedTemplate.sol';

contract SpektrRegistry {
    address[] public orderTemplates;
    address[] public templateOrner;

    function allTemplatesLength() external view returns (uint) {
        return orderTemplates.length;
    }
    
    constructor() public {
        address twoSidedTemplate = new SimpleTwoSidedTemplate();
        createTemplate(twoSidedTemplate);
        //TODO: add one sided
    }


    function createTemplate(address template) external returns () {
        orderTemplates.push(pair);
        templateOrner.push(msg.sender);
    }
}