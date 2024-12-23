export const CONTRACT_ADDRESS = ''; // Will be updated after deployment
export const CONTRACT_ABI = [
  "function createBlog(string memory _title, string memory _content)",
  "function getBlog(uint256 _id) view returns (tuple(uint256 id, string title, string content, address author, uint256 timestamp))",
  "function getAllBlogs() view returns (tuple(uint256 id, string title, string content, address author, uint256 timestamp)[])",
  "event BlogCreated(uint256 indexed id, string title, address indexed author, uint256 timestamp)"
];