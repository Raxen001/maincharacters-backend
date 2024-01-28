const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { secretKey, contractAddress, privateKey } = require("../constants.js");
const { formatEther } = require("ethers/lib/utils.js");

const sendTx = async function (to, amount) {
  const contract = await sdk.getContract(contractAddress);

  const tx = await contract.call("transfer", [to, amount], {
    gasLimit: 100000,
  });

  return tx.receipt;
};

module.exports = {
  sendTx,
};
