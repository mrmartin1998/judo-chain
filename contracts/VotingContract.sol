// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudokaRegistry.sol";

contract VotingContract {
    JudokaRegistry public judokaRegistry;

    struct Vote {
        address voter;
        bool isVerified;
    }

    mapping(address => Vote[]) public votesForUser;
    mapping(address => uint256) public receivedVotePoints;

    constructor(address judokaRegistryAddress) {
        judokaRegistry = JudokaRegistry(judokaRegistryAddress);
    }

    function voteForUser(address user, bool isVerified) public {
        JudokaRegistry.Judoka memory voter = judokaRegistry.getJudoka(msg.sender);
        require(voter.isRegistered, "Voter is not registered");

        JudokaRegistry.Judoka memory targetJudoka = judokaRegistry.getJudoka(user);
        require(targetJudoka.isRegistered, "Target user is not registered");

        uint votingPower = getVotingPower(voter.promotions[voter.promotions.length - 1].beltLevel);

        uint newPoints;
        if (isVerified) {
            newPoints = targetJudoka.points + votingPower;
        } else {
            newPoints = targetJudoka.points >= votingPower ? targetJudoka.points - votingPower : 0;
        }

        // Update the judoka registry with the new points
        judokaRegistry.updateJudokaPoints(user, newPoints);

        // Log the vote
        votesForUser[user].push(Vote({
            voter: msg.sender,
            isVerified: isVerified
        }));

        // Update the received vote points
        receivedVotePoints[user] = newPoints;
    }

    function getReceivedVotePoints(address user) public view returns (uint256) {
        return receivedVotePoints[user];
    }

    function getVotesForUser(address user) public view returns (Vote[] memory) {
        return votesForUser[user];
    }

    function getRequiredPointsForBelt(string memory _beltLevel) public pure returns (uint) {
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("White"))) return 0;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Yellow"))) return 100;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Orange"))) return 150;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Green"))) return 200;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Blue"))) return 400;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Brown"))) return 700;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (1st Dan)"))) return 1000;
        return 0;
    }

    function getVotingPower(string memory _beltLevel) public pure returns (uint) {
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("White"))) return 0;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Yellow"))) return 5;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Orange"))) return 10;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Green"))) return 20;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Blue"))) return 50;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Brown"))) return 100;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (1st Dan)"))) return 125;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (2nd Dan)"))) return 150;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (3rd Dan)"))) return 175;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (4th Dan)"))) return 200;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (5th Dan)"))) return 225;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (6th Dan)"))) return 250;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (7th Dan)"))) return 275;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (8th Dan)"))) return 300;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (9th Dan)"))) return 325;
        if (keccak256(abi.encodePacked(_beltLevel)) == keccak256(abi.encodePacked("Black (10th Dan)"))) return 350;
        return 0;
    }
}
