// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessagingContract {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    struct FriendRequest {
        address requester;
        address receiver;
        uint256 timestamp;
    }

    Message[] public messages;
    FriendRequest[] public friendRequests;

    mapping(address => uint256[]) public userMessages;
    mapping(address => uint256[]) public userFriendRequests;

    event MessageSent(address indexed sender, address indexed receiver, uint256 indexed messageId);
    event FriendRequestSent(address indexed requester, address indexed receiver, uint256 indexed requestId);
    event FriendRequestAccepted(address indexed requester, address indexed receiver);

    function sendMessage(address _receiver, string memory _content) public {
        messages.push(Message(msg.sender, _receiver, _content, block.timestamp));
        uint256 messageId = messages.length - 1;
        userMessages[msg.sender].push(messageId);
        userMessages[_receiver].push(messageId);

        emit MessageSent(msg.sender, _receiver, messageId);
    }

    function getMessage(uint256 _messageId) public view returns (address, address, string memory, uint256) {
        Message memory message = messages[_messageId];
        return (message.sender, message.receiver, message.content, message.timestamp);
    }

    function getUserMessages(address _user) public view returns (uint256[] memory) {
        return userMessages[_user];
    }

    function sendFriendRequest(address _receiver) public {
        friendRequests.push(FriendRequest(msg.sender, _receiver, block.timestamp));
        uint256 requestId = friendRequests.length - 1;
        userFriendRequests[_receiver].push(requestId);

        emit FriendRequestSent(msg.sender, _receiver, requestId);
    }

    function getFriendRequest(uint256 _requestId) public view returns (address, address, uint256) {
        FriendRequest memory request = friendRequests[_requestId];
        return (request.requester, request.receiver, request.timestamp);
    }

    function getUserFriendRequests(address _user) public view returns (uint256[] memory) {
        return userFriendRequests[_user];
    }

    function acceptFriendRequest(uint256 _requestId) public {
        FriendRequest memory request = friendRequests[_requestId];
        require(request.receiver == msg.sender, "Only the receiver can accept the friend request");

        // Logic to add friends to each other's friend list should be added here

        emit FriendRequestAccepted(request.requester, request.receiver);
    }
}
