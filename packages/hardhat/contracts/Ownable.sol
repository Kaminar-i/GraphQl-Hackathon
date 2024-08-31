// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;
import "./Student.sol";

contract Ownable {

    // Empty variable to set the address of the owner
    address payable  internal owner;

    event ChangeOwner(address indexed oldOwner, address indexed  newOwner);

    //constructor to save the deployer of the contract in the owner variable
    constructor() payable {
        owner = payable(msg.sender);
    }

    // Function to allow the contract to receive Ether
    // receive() external payable {}

    // Modifier to allow only the deployer of the Contract to be the owner
    modifier  onlyOwner {
        require(owner == msg.sender, "Caller not owner");
        _;
    }

    modifier isNotAddressZero() {
        require(msg.sender != address(0), "Invalid Address");
        _;
    }

    // Function to get the owner of the contract
    function getOwner() public  view returns (address){
        return owner;
    }

    // Function to change the owner using an address as a parmeter 
    function changeOwner(address payable _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Owner cannot be address zero");
        owner = _newOwner;
        emit ChangeOwner(owner, _newOwner);
    }

     // Function to get the contract's balance
    function getBalance() public view returns (uint256) {
        return address(owner).balance;
    }

    // Function to withdraw the contract's balance to the owner
    // function withdraw() public onlyOwner  virtual {
    //     uint256 balance = address(this).balance;
    //     require(balance > 0, "No funds to withdraw");

    //     owner.transfer(balance);

    // }

    
}