// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JudokaRegistry.sol";

contract ProfileManagement is JudokaRegistry {
    struct SocialMedia {
        string instagram;
        string facebook;
        string youtube;
    }

    struct ProfileInfo {
        string middleName;
        string birthday;
        bool makePublic;
        string sex;
        string state;
        string city;
        string country;
        string description;
    }

    struct Profile {
        ProfileInfo personalInfo;
        string profilePicture;
        string academy;
        SocialMedia socialMedia;
    }

    mapping(address => Profile) public profiles;

    function updateMiddleName(string memory middleName) public {
        profiles[msg.sender].personalInfo.middleName = middleName;
    }

    function updateBirthday(string memory birthday) public {
        profiles[msg.sender].personalInfo.birthday = birthday;
    }

    function updateMakePublic(bool makePublic) public {
        profiles[msg.sender].personalInfo.makePublic = makePublic;
    }

    function updateSex(string memory sex) public {
        profiles[msg.sender].personalInfo.sex = sex;
    }

    function updateState(string memory state) public {
        profiles[msg.sender].personalInfo.state = state;
    }

    function updateCity(string memory city) public {
        profiles[msg.sender].personalInfo.city = city;
    }

    function updateCountry(string memory country) public {
        profiles[msg.sender].personalInfo.country = country;
    }

    function updateDescription(string memory description) public {
        profiles[msg.sender].personalInfo.description = description;
    }

    function uploadProfilePicture(string memory profilePicture) public {
        profiles[msg.sender].profilePicture = profilePicture;
    }

    function updateSocialMedia(
        string memory instagram,
        string memory facebook,
        string memory youtube
    ) public {
        profiles[msg.sender].socialMedia = SocialMedia({
            instagram: instagram,
            facebook: facebook,
            youtube: youtube
        });
    }

    function updateAcademyAffiliation(string memory academy) public {
        profiles[msg.sender].academy = academy;
    }
}
