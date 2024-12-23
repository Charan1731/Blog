import { ethers } from "hardhat";

async function main() {
  const BlogContract = await ethers.getContractFactory("BlogContract");
  const blogContract = await BlogContract.deploy();
  await blogContract.waitForDeployment();

  const address = await blogContract.getAddress();
  console.log(`BlogContract deployed to: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });