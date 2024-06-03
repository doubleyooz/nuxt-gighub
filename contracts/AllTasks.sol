// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
contract TasksContract {
    struct Task {
        address payable owner;
        uint256 reward;
        uint256 deadline;
        address payable[] redeemers;
        uint256 winners_count;
    }

    Task[] public tasks;
    uint256 public maxRedeemers = 5; // Maximum number of redeemers
    event Withdrawal(uint _amount, address redeemer, uint when);

    constructor() {
        // console.log('Owner contract deployed by: %s', msg.sender);
    }

    function createTask(uint256 _reward, uint256 _deadline) external {
        require(_reward > 0, "Reward must be greater than zero");

        require(block.timestamp < _deadline, "Deadline must be in the future");
        address payable[] memory redeemersList = new address payable[](
            maxRedeemers
        );
        tasks.push(
            Task(
                payable(msg.sender),
                _reward,
                block.timestamp + _deadline,
                redeemersList,
                0
            )
        );
    }

    function redeemReward(uint256 _taskIndex) external payable {
        require(_taskIndex < tasks.length, "Invalid task index");

        Task storage _task = tasks[_taskIndex];

        require(
            _task.winners_count != maxRedeemers - 1,
            "Redeemers list is full"
        );

        require(
            block.timestamp < _task.deadline,
            "Deadline has already passed"
        );
        require(_task.reward > 0, "There are no rewards left");
        require(
            msg.sender != _task.owner,
            "The owner cannot redeem their own task"
        );
        if (insertAddress(_task)) {
            _task.winners_count += 1;
        } else {
            revert("Reward already redeemed by this address");
        }

        uint256 individualReward = (
            _task.winners_count < maxRedeemers ? _task.reward / 2 : _task.reward
        );

        emit Withdrawal(individualReward, msg.sender, block.timestamp);

        (bool success, ) = payable(msg.sender).call{value: individualReward}(
            ""
        );
        require(success, "Transfer failed."); // it fails here
        // console.log("Transfer succeeded");
        _task.reward -= individualReward;
    }

    function cancelTask(uint256 _taskIndex) external {
        Task storage _task = tasks[_taskIndex];
        require(
            msg.sender == _task.owner,
            "Only the owner can cancel the task"
        );

        // Remove the _task from the array
        tasks[_taskIndex] = tasks[tasks.length - 1];
        tasks.pop();

        payable(_task.owner).transfer(_task.reward);
    }

    function containsAddress(
        address payable[] memory addresses
    ) public view returns (bool) {
        for (uint i = 0; i < addresses.length; i++) {
            if (msg.sender == addresses[i]) {
                return true;
            }
        }
        return false;
    }

    function insertAddress(Task memory _task) public view returns (bool) {
        for (uint i = 0; i < _task.winners_count; i++) {
            if (msg.sender == _task.redeemers[i]) {
                return false;
            }
        }

        if (_task.winners_count < maxRedeemers) {
            _task.redeemers[_task.winners_count] = payable(msg.sender);

            return true;
        }
        return false;
    }
}
