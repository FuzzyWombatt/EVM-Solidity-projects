//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Test{
    receive() external payable {       
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}