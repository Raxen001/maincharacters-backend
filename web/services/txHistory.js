const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { secretKey, contractAddress } = require("../constants.js");
const { formatEther } = require("ethers/lib/utils.js");

const sdk = new ThirdwebSDK("mumbai", { secretKey });

const txHistory = async function (addressToFindHistory) {
  const contract = await sdk.getContract(contractAddress);

  // listen to latest events
  const latestEventReceived = await contract.events.getEvents("Transfer", {
    fromBlock: 0,
    toBlock: "latest",
    order: "desc",
    filters: {
      // from: addressToFindHistory,
      to: addressToFindHistory,
    },
  });
  const latestEventSent = await contract.events.getEvents("Transfer", {
    fromBlock: 0,
    toBlock: "latest",
    order: "desc",

    filters: {
      from: addressToFindHistory,
      // to: addressToFindHistory,
    },
  });
  // return Number(latestEvent[0].data.value._hex);
  return {
    latestEventSent: latestEventSent.map((event) => {
      return formatEther(event?.data?.value?._hex);
    }),
    latestEventReceived: latestEventReceived.map((event) => {
      return formatEther(event?.data?.value?._hex);
    }),
  };
};

async function main() {
  // const result = await runEvents();
  // console.log(result);
  const history = await txHistory("0xd68c62F898371Cd602d639eC190A70C6F0101d7f");
  console.log(history);
}

main().catch((e) => console.log("error", e));
