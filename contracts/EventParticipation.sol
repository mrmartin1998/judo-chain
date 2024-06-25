// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventParticipation {
    struct Event {
        string name;
        string date;
        string location;
        string description;
    }

    mapping(address => Event[]) public events;

    function addEvent(
        string memory name,
        string memory date,
        string memory location,
        string memory description
    ) public {
        events[msg.sender].push(Event({
            name: name,
            date: date,
            location: location,
            description: description
        }));
    }

    function getEvents(address user) public view returns (Event[] memory) {
        return events[user];
    }
}
