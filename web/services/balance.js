const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { secretKey, contractAddress } = require("../constants.js");
const { formatEther } = require("ethers/lib/utils.js");

const sdk = new ThirdwebSDK("mumbai", { secretKey });

async function runEvents(addressToFindBalance) {
  const contract = await sdk.getContract(contractAddress);

  const balance = await contract.call("balanceOf", [addressToFindBalance]);

  return formatEther(balance._hex);
}

async function main() {
  const result = await runEvents("0x8d30B3d4B6937b2fDE5267c20bE2e75e004113AA");
  console.log(result);
}

main().catch((e) => console.log("error", e));
