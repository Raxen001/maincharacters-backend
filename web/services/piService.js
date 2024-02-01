const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { secretKey, contractAddress, piURL } = require("../constants.js");
const { formatEther } = require("ethers/lib/utils.js");

const sdk = new ThirdwebSDK("mumbai", { secretKey });

const listenToEvents = async function () {
  const contract = await sdk.getContract(contractAddress);

  // listen to latest events
  contract.events.listenToAllEvents(async (event) => {
    console.log("Transfer event: ", formatEther(event.data.value._hex));
    // const response = await fetch(piURL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Add any additional headers if required
    //   },
    //   body: JSON.stringify({
    //     amount: formatEther(event.data.value._hex),
    //   }),
    // });
    console.log(response);
  });
  // return Number(latestEvent[0].data.value._hex);
};

async function main() {
  // const result = await runEvents();
  // console.log(result);
  await listenToEvents();
}

main().catch((e) => console.log("error", e));
