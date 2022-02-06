//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery{
    //external account that owns contract and is public
    address public manager;
    //marks a dynamic array of payable address
    address payable[] private players;

    constructor(){
        manager = msg.sender;
    }

    receive() external payable{
        //require is proper way to valid in solidity
        //value is done in wei unless a suffix is added to change denomination
        require(msg.value == 0.1 ether);

        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        require(msg.sender == manager);
        //address(this) refers to the contract address itself
        return address(this).balance;
    }
    //for some reason this is necesary for testing to avaoid issues with players() getter
    function getPlayers() public view returns(address payable[] memory){
        return players;
    }

    function random() internal view returns(uint){
        //doesn't return a truly random number that is good enough - needs an oracle like chainlink
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public{
        require(msg.sender == manager);
        require(players.length >= 3);
        //index of the winnder in the players array
        uint index = random() % players.length;
        //transfer the contract balance to the winner
        players[index].transfer(getBalance());
        //resets lottery and sizes the players dyn-array to 0
        players = new address payable[](0);
    }
}