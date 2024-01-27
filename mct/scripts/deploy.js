// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("MyToken");

  const contract = await contractFactory.deploy();

  const txReceipt = await contract.deploymentTransaction()?.wait();

  console.log("Contract deployed to:", txReceipt.contractAddress);

  const nameOfToken = await contract.name();

  console.log("Name of token:", nameOfToken);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
