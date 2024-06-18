// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudokaRegistry.sol";

contract VotingContract {
    JudokaRegistry public judokaRegistry;

    struct Vote {
        address voter;
        uint256 points;
    }

    mapping(address => Vote[]) public votes;
    mapping(address => uint256) public voteCounts;

    constructor(address _judokaRegistry) {
        judokaRegistry = JudokaRegistry(_judokaRegistry);
    }

    function vote(address _judokaAddress) public {
        JudokaRegistry.Judoka memory voter = judokaRegistry.getJudoka(msg.sender);
        require(voter.isRegistered, "Voter is not registered.");
        uint256 points = judokaRegistry.getVotingPower(voter.promotions[voter.promotions.length - 1].beltLevel);
        require(points > 0, "Voter has no voting power.");

        votes[_judokaAddress].push(Vote({
            voter: msg.sender,
            points: points
        }));

        voteCounts[_judokaAddress] += points;

        // Check if the judoka has enough points for verification
        uint256 requiredPoints = getRequiredPoints(_judokaAddress);
        if (voteCounts[_judokaAddress] >= requiredPoints) {
            // Update the judoka's verified status
            // judokaRegistry.verifyJudoka(_judokaAddress);
        }
    }

    function getRequiredPoints(address _judokaAddress) public view returns (uint256) {
        JudokaRegistry.Promotion[] memory promotions = judokaRegistry.getJudokaPromotions(_judokaAddress);
        string memory currentBelt = promotions[promotions.length - 1].beltLevel;

        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("White")))) return 0;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Yellow")))) return 100;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Orange")))) return 150;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Green")))) return 200;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Blue")))) return 400;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Brown")))) return 700;
        if (keccak256(abi.encodePacked((currentBelt))) == keccak256(abi.encodePacked(("Black (1st Dan)")))) return 1000;
        return 0;
    }

    function getVotes(address _judokaAddress) public view returns (Vote[] memory) {
        return votes[_judokaAddress];
    }

    function getVoteCount(address _judokaAddress) public view returns (uint256) {
        return voteCounts[_judokaAddress];
    }
}
