// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudokaRegistry {
    struct Judoka {
        string firstName;
        string lastName;
        string email;
        string beltLevel;
        bool isRegistered;
    }

    mapping(address => Judoka) public judokas;

    function registerJudoka(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _beltLevel
    ) public {
        require(!judokas[msg.sender].isRegistered, "Judoka is already registered.");

        judokas[msg.sender] = Judoka({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            beltLevel: _beltLevel,
            isRegistered: true
        });
    }

    function getJudoka(address _judokaAddress) public view returns (Judoka memory) {
        return judokas[_judokaAddress];
    }
}
