//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery{
    //external account that owns contract and is public
    address public manager;
    //marks a dynamic array of payable address
    address payable[] public players;

    constructor(){
        manager = msg.sender;
    }

    receive() external payable{
        //value is done in wei unless a suffix is added to change denomination
        require(msg.value == )

        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        //address(this) refers to the contract address itself
        return address(this).balance;
    }
}