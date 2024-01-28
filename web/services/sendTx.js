const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { secretKey, contractAddress, privateKey } = require("../constants.js");
const { formatEther } = require("ethers/lib/utils.js");

const sendTx = async function (to, amount) {
  const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai", {
    secretKey,
  });

  const contract = await sdk.getContract(contractAddress);

  const tx = await contract.call("transfer", [to, amount], {
    gasLimit: 100000,
  });

  return tx.receipt;
};

async function main() {
  const rpt = await sendTx(
    "0xd68c62F898371Cd602d639eC190A70C6F0101d7f",
    "6900000000000000000"
  );
  console.log(rpt);
}

main().catch((e) => console.log("error", e));
