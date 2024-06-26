// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompetitionRecords {
    struct Medal {
        string eventName;
        string location;
        string division;
        string result;
        string date;
        string imageUrl;
    }

    struct Match {
        string eventName;
        string location;
        string division;
        string opponent;
        string result;
        string method;
        string youtubeId;
        string date;
    }

    mapping(address => Medal[]) public medals;
    mapping(address => Match[]) public matches;

    function addMedal(
        string memory eventName,
        string memory location,
        string memory division,
        string memory result,
        string memory date,
        string memory imageUrl
    ) public {
        medals[msg.sender].push(Medal({
            eventName: eventName,
            location: location,
            division: division,
            result: result,
            date: date,
            imageUrl: imageUrl
        }));
    }

    function addMatch(
        string memory eventName,
        string memory location,
        string memory division,
        string memory opponent,
        string memory result,
        string memory method,
        string memory youtubeId,
        string memory date
    ) public {
        matches[msg.sender].push(Match({
            eventName: eventName,
            location: location,
            division: division,
            opponent: opponent,
            result: result,
            method: method,
            youtubeId: youtubeId,
            date: date
        }));
    }

    function getMedals(address user) public view returns (Medal[] memory) {
        return medals[user];
    }

    function getMatches(address user) public view returns (Match[] memory) {
        return matches[user];
    }
}
