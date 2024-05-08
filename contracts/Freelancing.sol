// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Freelancing {
    uint public unlockTime;
    address payable public owner;
    address payable public freelancer;
    uint public amount;

    event Withdrawal(uint _amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        amount = msg.value;
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(freelancer != address(0), "Freelancer isn't defined.");
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == freelancer, "You aren't the freelancer");
        require(address(this).balance > 0, "No funds to withdraw");

        emit Withdrawal(address(this).balance, block.timestamp);
        freelancer.transfer(address(this).balance);
    }

    function cancelDeal() public {
        require(msg.sender == owner, "You aren't the owner");
        require(address(this).balance > 0, "No funds to withdraw");

        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }

    function setFreelancer(address payable _freelancer) public {
        require(block.timestamp <= unlockTime, "This gig is expired");
        require(freelancer == address(0), "Freelancer is already defined.");
        require(_freelancer != address(0), "Invalid freelancer address");

        freelancer = _freelancer;
    }
}
