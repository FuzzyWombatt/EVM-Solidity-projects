//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Auction {
    address payable public owner;
    //to derive start and end time of the auction
    uint public startBlock;
    uint public endBlock;
    //storage for inter planatary file system. cheaper than on chain storage
    string public ipfsHash;

    enum State {
        Started,
        Running,
        Ended,
        Canceled
    }
    //enum state of the action
    State public auctionState;

    uint public highestBid;
    //address is payable in case auction is prematuraly canceled
    address payable public highestBidder;
    mapping(address => uint) public bids;
    uint bidIncrement;

    //
    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

    modifier notOwner(){
        require(msg.sender != owner);
        _;
    }

    modifier afterStart(){
        require(block.number >= startBlock);
        _;
    }

    modifier beforeEnd(){
        require(block.number <= endBlock);
        _;
    }

    modifier auctionRunning(){
        require(auctionState == State.Running);
        require(block.number >= startBlock);
        require(block.number <= endBlock);
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        auctionState = State.Running;
        //based off ether ~15s block time
        startBlock = block.number;
        //40320 is roughly 1week
        endBlock = startBlock +40320;
        ipfsHash = '';
        //100 wei
        bidIncrement = 100;
    }

    function placeBid() public payable auctionRunning notOwner{
        require( msg.value >= 100);

        uint currentBid = bids[msg.sender] + msg.value;
    }




}