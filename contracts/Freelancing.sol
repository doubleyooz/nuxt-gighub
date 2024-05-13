// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Freelancing {
    uint public expiresAt;
    uint public deadline;
    address payable public owner;
    address payable public freelancer;
    uint public amount;
    uint public penaltyPercentage = 20; // 20% penalty

    event Withdrawal(uint _amount, uint when);

    constructor(uint _deadline) payable {
        require(
            block.timestamp < _deadline,
            "Unlock time should be in the future"
        );
        expiresAt = block.timestamp + 30 days;
        amount = msg.value;
        deadline = _deadline;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(freelancer != address(0), "Freelancer isn't defined.");

        require(msg.sender == owner, "You aren't the owner");
        require(address(this).balance > 0, "No funds to withdraw");

        if (block.timestamp >= deadline) {
            // Calculate the penalty amount
            uint penaltyAmount = (address(this).balance * penaltyPercentage) /
                100;
            uint remainingAmount = address(this).balance - penaltyAmount;

            emit Withdrawal(remainingAmount, block.timestamp);
            freelancer.transfer(remainingAmount);
            owner.transfer(penaltyAmount);
        } else {
            emit Withdrawal(address(this).balance, block.timestamp);
            freelancer.transfer(address(this).balance);
        }
    }

    function cancelDeal() public {
        require(msg.sender == owner, "You aren't the owner");
        require(address(this).balance > 0, "No funds to withdraw");

        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }

    function setFreelancer(address payable _freelancer) public {
        require(block.timestamp <= expiresAt, "This gig is expired");
        require(freelancer == address(0), "Freelancer is already defined.");
        require(_freelancer != address(0), "Invalid freelancer address");

        freelancer = _freelancer;
    }
}
