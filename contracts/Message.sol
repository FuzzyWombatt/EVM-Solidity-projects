//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Message{
    address owner;
    string public message;

    constructor(string memory _message){
        owner = msg.sender;
        message = _message;
    }

    function changeMessage(string memory newMessage) public {
        require(msg.sender == owner);    
        message = newMessage;
    }
}