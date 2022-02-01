//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

//extremely simple contract that is used for testing purposes for setting/testing up programtic chain
contract Test{
    receive() external payable {       
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}