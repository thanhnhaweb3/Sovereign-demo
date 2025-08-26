// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Sample {
    string public data;

    function setData(string memory _data) external {
        data = _data;
    }
}
