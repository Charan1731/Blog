import { Contract, BrowserProvider } from 'ethers';

const CONTRACT_ADDRESS = ''; // Deploy contract and add address here
const CONTRACT_ABI = [
  "function createBlog(string memory _title, string memory _content)",
  "function getBlog(uint256 _id) view returns (tuple(uint256 id, string title, string content, address author, uint256 timestamp))",
  "function getAllBlogs() view returns (tuple(uint256 id, string title, string content, address author, uint256 timestamp)[])",
  "event BlogCreated(uint256 indexed id, string title, address indexed author, uint256 timestamp)"
];

export const getContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};