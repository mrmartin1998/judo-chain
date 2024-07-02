// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForumContract {
    struct Post {
        uint id;
        address author;
        string title;
        string content;
        uint[] commentIds;
    }

    struct Comment {
        uint id;
        address author;
        string content;
    }

    uint public postCount = 0;
    uint public commentCount = 0;
    mapping(uint => Post) public posts;
    mapping(uint => Comment) public comments;

    event PostCreated(uint id, address author, string title, string content);
    event CommentCreated(uint id, address author, string content, uint postId);

    function createPost(string memory title, string memory content) public {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, title, content, new uint[](0));
        emit PostCreated(postCount, msg.sender, title, content);
    }

    function createComment(uint postId, string memory content) public {
        require(postId > 0 && postId <= postCount, "Post does not exist");
        commentCount++;
        comments[commentCount] = Comment(commentCount, msg.sender, content);
        posts[postId].commentIds.push(commentCount);
        emit CommentCreated(commentCount, msg.sender, content, postId);
    }

    function getPostComments(uint postId) public view returns (Comment[] memory) {
        require(postId > 0 && postId <= postCount, "Post does not exist");
        uint[] memory commentIds = posts[postId].commentIds;
        Comment[] memory postComments = new Comment[](commentIds.length);
        for (uint i = 0; i < commentIds.length; i++) {
            postComments[i] = comments[commentIds[i]];
        }
        return postComments;
    }
}
