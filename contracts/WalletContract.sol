// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract WalletContract {
    
    address public  owner;
    mapping(address => uint) public allowances;
    
    constructor() {
        owner = msg.sender;
    }
    
    function getOwner() public view returns(address) {
        return owner;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Not allowed: you are not the owner");
        _;
    }
    
    function addFunds() public payable {
        
    }
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    function addAllowances(address _address, uint _value) public onlyOwner {
        allowances[_address] += _value;
    }
    
    function withdrawFunds(uint _amount) public {
        if(msg.sender == owner) {
            require(_amount <= getBalance(), "Limit exceeded");
            payable(msg.sender).transfer(_amount);
            
        } else {
            require(allowances[msg.sender] >= _amount, "Not allowed");
            require(_amount <= getBalance(), "Limit exceeded");
            payable(msg.sender).transfer(_amount);
            allowances[msg.sender] -= _amount;
        }
        
    }
}