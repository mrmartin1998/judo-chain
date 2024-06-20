// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudokaRegistry.sol";

contract VotingContract {
    JudokaRegistry public judokaRegistry;

    struct Vote {
        address voter;
        uint points;
    }

    struct PromotionRequest {
        address userAddress;
        string beltLevel;
        uint points;
        bool verified;
        Vote[] votes;
    }

    PromotionRequest[] public promotionRequests;

    constructor(address judokaRegistryAddress) {
        judokaRegistry = JudokaRegistry(judokaRegistryAddress);
    }

    function requestPromotion(string memory _beltLevel) public {
        JudokaRegistry.Judoka memory judoka = judokaRegistry.getJudoka(msg.sender);
        require(judoka.isRegistered, "User is not registered");

        PromotionRequest storage newRequest = promotionRequests.push();
        newRequest.userAddress = msg.sender;
        newRequest.beltLevel = _beltLevel;
        newRequest.points = 0;
        newRequest.verified = false;
    }

    function voteForPromotion(uint requestId) public {
        require(requestId < promotionRequests.length, "Invalid request ID");
        PromotionRequest storage request = promotionRequests[requestId];
        require(!request.verified, "Promotion already verified");

        JudokaRegistry.Judoka memory judoka = judokaRegistry.getJudoka(msg.sender);
        uint votingPower = judoka.votingPower;
        require(votingPower > 0, "No voting power");

        request.points += votingPower;
        request.votes.push(Vote({voter: msg.sender, points: votingPower}));

        if (request.points >= getRequiredPointsForBelt(request.beltLevel)) {
            request.verified = true;
        }
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

    function getUserVotePoints(address user) public view returns (uint) {
        uint totalPoints = 0;
        for (uint i = 0; i < promotionRequests.length; i++) {
            for (uint j = 0; j < promotionRequests[i].votes.length; j++) {
                if (promotionRequests[i].votes[j].voter == user) {
                    totalPoints += promotionRequests[i].votes[j].points;
                }
            }
        }
        return totalPoints;
    }

    function getReceivedVotePoints(address user) public view returns (uint) {
        uint receivedPoints = 0;
        for (uint i = 0; i < promotionRequests.length; i++) {
            if (promotionRequests[i].userAddress == user) {
                receivedPoints += promotionRequests[i].points;
            }
        }
        return receivedPoints;
    }
}
