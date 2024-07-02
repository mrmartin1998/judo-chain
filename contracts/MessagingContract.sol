// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessagingContract {
    struct Message {
        address sender;
        address receiver;
        string content;
    }

    struct FriendRequest {
        address requester;
        address receiver;
    }

    Message[] public messages;
    FriendRequest[] public friendRequests;
    mapping(address => address[]) public friends;
    mapping(address => uint256[]) public userMessages;
    mapping(address => uint256[]) public userFriendRequests;

    event MessageSent(address indexed sender, address indexed receiver, uint256 indexed messageId);
    event FriendRequestSent(address indexed requester, address indexed receiver, uint256 indexed requestId);
    event FriendRequestAccepted(address indexed requester, address indexed receiver);

    function sendMessage(address _receiver, string memory _content) public {
        require(isFriend(msg.sender, _receiver), "You can only send messages to friends.");
        messages.push(Message(msg.sender, _receiver, _content));
        uint256 messageId = messages.length - 1;
        userMessages[msg.sender].push(messageId);
        userMessages[_receiver].push(messageId);

        emit MessageSent(msg.sender, _receiver, messageId);
    }

    function getMessage(uint256 _messageId) public view returns (address, address, string memory) {
        Message memory message = messages[_messageId];
        return (message.sender, message.receiver, message.content);
    }

    function getUserMessages(address _user) public view returns (uint256[] memory) {
        return userMessages[_user];
    }

    function sendFriendRequest(address _receiver) public {
        require(!isFriend(msg.sender, _receiver), "You are already friends.");
        friendRequests.push(FriendRequest(msg.sender, _receiver));
        uint256 requestId = friendRequests.length - 1;
        userFriendRequests[_receiver].push(requestId);

        emit FriendRequestSent(msg.sender, _receiver, requestId);
    }

    function getFriendRequest(uint256 _requestId) public view returns (address, address) {
        FriendRequest memory request = friendRequests[_requestId];
        return (request.requester, request.receiver);
    }

    function getUserFriendRequests(address _user) public view returns (uint256[] memory) {
        return userFriendRequests[_user];
    }

    function acceptFriendRequest(uint256 _requestId) public {
        FriendRequest memory request = friendRequests[_requestId];
        require(request.receiver == msg.sender, "Only the receiver can accept the friend request");

        friends[request.requester].push(request.receiver);
        friends[request.receiver].push(request.requester);

        delete friendRequests[_requestId];

        emit FriendRequestAccepted(request.requester, request.receiver);
    }

    function getUserFriends(address _user) public view returns (address[] memory) {
        return friends[_user];
    }

    function isFriend(address _user, address _friend) public view returns (bool) {
        address[] memory userFriends = friends[_user];
        for (uint256 i = 0; i < userFriends.length; i++) {
            if (userFriends[i] == _friend) {
                return true;
            }
        }
        return false;
    }
}
