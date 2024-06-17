// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudokaRegistry {
    struct Judoka {
        string firstName;
        string lastName;
        string email;
        string beltLevel;
        string promotionDate; // store the date as a string
        string gym;
        bool isRegistered;
    }

    mapping(address => Judoka) public judokas;

    function registerJudoka(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _beltLevel,
        string memory _promotionDate,
        string memory _gym
    ) public {
        require(!judokas[msg.sender].isRegistered, "Judoka is already registered.");

        judokas[msg.sender] = Judoka({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            beltLevel: _beltLevel,
            promotionDate: _promotionDate,
            gym: _gym,
            isRegistered: true
        });
    }

    function getJudoka(address _judokaAddress) public view returns (Judoka memory) {
        return judokas[_judokaAddress];
    }

    function updateJudoka(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _beltLevel,
        string memory _promotionDate,
        string memory _gym
    ) public {
        require(judokas[msg.sender].isRegistered, "Judoka is not registered.");
        
        judokas[msg.sender].firstName = _firstName;
        judokas[msg.sender].lastName = _lastName;
        judokas[msg.sender].email = _email;
        judokas[msg.sender].beltLevel = _beltLevel;
        judokas[msg.sender].promotionDate = _promotionDate; // update the date as a string
        judokas[msg.sender].gym = _gym;
    }
}
