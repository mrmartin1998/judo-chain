// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudokaRegistry.sol";

contract VotingContract {
    JudokaRegistry public judokaRegistry;

    constructor(address judokaRegistryAddress) {
        judokaRegistry = JudokaRegistry(judokaRegistryAddress);
    }

    // Function to get the required points for a specific belt level
    function getRequiredPointsForBelt(string memory _beltLevel) public pure returns (uint) {
        bytes32 beltHash = keccak256(abi.encodePacked(_beltLevel));
        if (beltHash == keccak256(abi.encodePacked("White"))) return 0;
        if (beltHash == keccak256(abi.encodePacked("Yellow"))) return 100;
        if (beltHash == keccak256(abi.encodePacked("Orange"))) return 150;
        if (beltHash == keccak256(abi.encodePacked("Green"))) return 200;
        if (beltHash == keccak256(abi.encodePacked("Blue"))) return 400;
        if (beltHash == keccak256(abi.encodePacked("Brown"))) return 700;
        if (beltHash == keccak256(abi.encodePacked("Black (1st Dan)"))) return 1000;
        return 0;
    }

    // Function to get the current points of a judoka
    function getUserVotePoints(address user) public view returns (uint) {
        JudokaRegistry.Judoka memory judoka = judokaRegistry.getJudoka(user);
        return judoka.votingPower;
    }
}
