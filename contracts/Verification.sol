// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verification {
    struct VerificationRequest {
        address user;
        string documentHash;
        bool isVerified;
    }

    mapping(address => VerificationRequest) public verificationRequests;

    function submitVerificationRequest(string memory documentHash) public {
        verificationRequests[msg.sender] = VerificationRequest({
            user: msg.sender,
            documentHash: documentHash,
            isVerified: false
        });
    }

    function approveVerification(address user) public {
        require(verificationRequests[user].user == user, "Invalid user");
        verificationRequests[user].isVerified = true;
    }

    function isVerified(address user) public view returns (bool) {
        return verificationRequests[user].isVerified;
    }
}
