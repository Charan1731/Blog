// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlogContract {
    struct Blog {
        uint256 id;
        string title;
        string content;
        address author;
        uint256 timestamp;
    }

    event BlogCreated(
        uint256 indexed id,
        string title,
        address indexed author,
        uint256 timestamp
    );

    mapping(uint256 => Blog) public blogs;
    uint256 public blogCount;

    function createBlog(string memory _title, string memory _content) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");

        blogCount++;
        blogs[blogCount] = Blog(
            blogCount,
            _title,
            _content,
            msg.sender,
            block.timestamp
        );

        emit BlogCreated(blogCount, _title, msg.sender, block.timestamp);
    }

    function getBlog(uint256 _id) public view returns (Blog memory) {
        require(_id > 0 && _id <= blogCount, "Invalid blog ID");
        return blogs[_id];
    }

    function getAllBlogs() public view returns (Blog[] memory) {
        Blog[] memory allBlogs = new Blog[](blogCount);
        for (uint256 i = 1; i <= blogCount; i++) {
            allBlogs[i - 1] = blogs[i];
        }
        return allBlogs;
    }
}