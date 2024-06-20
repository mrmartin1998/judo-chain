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
        uint256 votingPower;
        uint256 points;  // Add this field
    }

    mapping(address => Judoka) public judokas;
    address[] public judokaAddresses;

    function registerJudoka(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _beltLevel,
        string memory _promotionDate,
        string memory _gym
    ) public {
        require(!judokas[msg.sender].isRegistered, "Judoka is already registered.");

        uint256 votingPower = getVotingPower(_beltLevel);

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
        newJudoka.votingPower = votingPower;
        newJudoka.points = 0;  // Initialize points to 0
        newJudoka.promotions.push(initialPromotion);

        judokaAddresses.push(msg.sender);
    }

    function getVotingPower(string memory _beltLevel) public pure returns (uint256) {
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("White")))) return 0;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Yellow")))) return 5;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Orange")))) return 10;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Green")))) return 20;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Blue")))) return 50;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Brown")))) return 100;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (1st Dan)")))) return 125;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (2nd Dan)")))) return 150;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (3rd Dan)")))) return 175;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (4th Dan)")))) return 200;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (5th Dan)")))) return 225;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (6th Dan)")))) return 250;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (7th Dan)")))) return 275;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (8th Dan)")))) return 300;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (9th Dan)")))) return 325;
        if (keccak256(abi.encodePacked((_beltLevel))) == keccak256(abi.encodePacked(("Black (10th Dan)")))) return 350;
        return 0;
    }

    function getJudoka(address _judokaAddress) public view returns (Judoka memory) {
        return judokas[_judokaAddress];
    }

    function getJudokaPromotions(address _judokaAddress) public view returns (Promotion[] memory) {
        return judokas[_judokaAddress].promotions;
    }

    function getAllJudokas() public view returns (address[] memory) {
        return judokaAddresses;
    }

    function updateJudokaPoints(address _judokaAddress, uint256 newPoints) public {
        require(judokas[_judokaAddress].isRegistered, "Judoka is not registered.");
        judokas[_judokaAddress].points = newPoints;
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
