//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery{
    address public manager;
    address payable[] private players;
    //for testing purposes of random
    uint public index;

    modifier notOwner {
        require(msg.sender != manager);
        _;
    }

    constructor(){
        manager = msg.sender;
    }

    receive() external payable notOwner{
        require(msg.value == 0.1 ether);

        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        require(msg.sender == manager);

        return address(this).balance;
    }

    function getPlayers() public view returns(address payable[] memory){
        return players;
    }

    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public{
        require(msg.sender == manager);
        require(players.length >= 3);

        index = random() % players.length;

        players[index].transfer(getBalance());

        players = new address payable[](0);
    }
}