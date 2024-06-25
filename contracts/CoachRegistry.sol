// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoachRegistry {
    struct Coach {
        string name;
        address coachAddress;
        string status;
    }

    mapping(address => Coach[]) private coaches;
    address[] private coachAddresses;

    event CoachAdded(address indexed judoka, string name, address coachAddress, string status);

    function addCoach(address coachAddress, string memory name) public {
        coaches[msg.sender].push(Coach({
            name: name,
            coachAddress: coachAddress,
            status: "Pending"
        }));
        coachAddresses.push(coachAddress);
        emit CoachAdded(msg.sender, name, coachAddress, "Pending");
    }

    function getCoaches(address judoka) public view returns (Coach[] memory) {
        return coaches[judoka];
    }

    function updateCoachStatus(address judoka, uint index, string memory status) public {
        require(index < coaches[judoka].length, "Invalid index");
        coaches[judoka][index].status = status;
    }
}
