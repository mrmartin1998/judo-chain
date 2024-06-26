// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InjuryRegistry {
    struct Injury {
        string name;
        string description;
        string areaOfBody;
        string dateOfInjury;
        string severity;
    }

    mapping(address => Injury[]) public injuries;

    function addInjury(
        string memory name,
        string memory description,
        string memory areaOfBody,
        string memory dateOfInjury,
        string memory severity
    ) public {
        injuries[msg.sender].push(Injury({
            name: name,
            description: description,
            areaOfBody: areaOfBody,
            dateOfInjury: dateOfInjury,
            severity: severity
        }));
    }

    function getInjuries(address user) public view returns (Injury[] memory) {
        return injuries[user];
    }
}
