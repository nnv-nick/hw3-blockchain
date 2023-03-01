// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NnvNickToken is ERC20 {
    struct SampleText {
        string name;
        bool logicVal;
        int num;
    }

    mapping(int => SampleText) public SampleMapping;

    event ElementAddedToSampleMapping(int key, SampleText value);
    event ElementDeletedFromSampleMapping(int key, SampleText value);

    constructor(uint256 initialSupply) ERC20("NnvNick", "NNV") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function add_to_mapping(int key, SampleText memory value) public {
        SampleMapping[key] = value;
        emit ElementAddedToSampleMapping(key, value);
    }

    function delete_from_mapping(int key) public {
        emit ElementDeletedFromSampleMapping(key, SampleMapping[key]);
        delete SampleMapping[key];
    }
}