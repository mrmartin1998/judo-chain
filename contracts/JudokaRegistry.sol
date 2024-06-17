// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JudokaRegistry {
    struct Promotion {
        string beltLevel;
        string promotionDate;
        string gym;
    }

    struct Judoka {
        string firstName;
        string lastName;
        string email;
        bool isRegistered;
        Promotion[] promotions;
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

        Promotion memory initialPromotion = Promotion({
            beltLevel: _beltLevel,
            promotionDate: _promotionDate,
            gym: _gym
        });

        Judoka storage newJudoka = judokas[msg.sender];
        newJudoka.firstName = _firstName;
        newJudoka.lastName = _lastName;
        newJudoka.email = _email;
        newJudoka.isRegistered = true;
        newJudoka.promotions.push(initialPromotion);
    }

    function getJudoka(address _judokaAddress) public view returns (Judoka memory) {
        return judokas[_judokaAddress];
    }

    function getJudokaPromotions(address _judokaAddress) public view returns (Promotion[] memory) {
        return judokas[_judokaAddress].promotions;
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

        Promotion memory newPromotion = Promotion({
            beltLevel: _beltLevel,
            promotionDate: _promotionDate,
            gym: _gym
        });

        judokas[msg.sender].promotions.push(newPromotion);
    }
}
