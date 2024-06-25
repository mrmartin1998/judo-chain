// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentManagement {
    struct InstructionalVideo {
        string title;
        string youtubeLink;
        string category;
    }

    struct Seminar {
        string seminarName; 
        string location;
        string date;
        string imageUrl;
    }

    struct Link {
        string text;
        string url;
    }

    mapping(address => InstructionalVideo[]) public instructionalVideos;
    mapping(address => Seminar[]) public seminars;
    mapping(address => Link[]) public links;

    function addInstructionalVideo(
        string memory title,
        string memory youtubeLink,
        string memory category
    ) public {
        instructionalVideos[msg.sender].push(InstructionalVideo({
            title: title,
            youtubeLink: youtubeLink,
            category: category
        }));
    }

    function addSeminar(
        string memory seminarName,
        string memory location,
        string memory date,
        string memory imageUrl
    ) public {
        seminars[msg.sender].push(Seminar({
            seminarName: seminarName,
            location: location,
            date: date,
            imageUrl: imageUrl
        }));
    }

    function addLink(
        string memory text,
        string memory url
    ) public {
        links[msg.sender].push(Link({
            text: text,
            url: url
        }));
    }
}
