// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import './templates/SimpleTwoSidedTemplate.sol';
import './templates/SimpleOneSidedTemplate.sol';

contract SpektrRegistry {

    struct Template {
        address owner;
        address template;
    }

    Template[] public orderTemplates;

    function allTemplatesLength() external view returns (uint) {
        return orderTemplates.length;
    }
    
    constructor() {
        address twoSidedTemplate = new SimpleTwoSidedTemplate();
        createTemplate(twoSidedTemplate);

        address oneSidedTemplate = new SimpleOneSidedTemplate();
        createTemplate(oneSidedTemplate);
    }

    function createTemplate(address template) public {
        Template memory newTemplate = Template(msg.sender, template);
        orderTemplates.push(newTemplate);
    }
}