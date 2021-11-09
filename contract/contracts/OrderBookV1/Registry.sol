// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import './templates/SimpleTwoSidedTemplate.sol';
import './templates/SimpleOneSidedTemplate.sol';
import './Factory.sol';

contract Registry {

    struct Template {
        address owner;
        address template;
    }

    Template[] public orderTemplates;
    address public factory;

    function allTemplatesLength() external view returns (uint) {
        return orderTemplates.length;
    }

    function getTemplateAddress(uint _id) public view returns (address) {
        return orderTemplates[_id].template;
    }
    
    constructor() {
        factory = address(new Factory());

        address twoSidedTemplate = address(new SimpleTwoSidedTemplate());
        createTemplate(twoSidedTemplate);

        address oneSidedTemplate = address(new SimpleOneSidedTemplate());
        createTemplate(oneSidedTemplate);
    }

    function createTemplate(address template) public {
        Template memory newTemplate = Template(msg.sender, template);
        orderTemplates.push(newTemplate);
    }
}