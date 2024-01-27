const { ThirdwebSDK } = require("@thirdweb-dev/sdk");

const sdk = new ThirdwebSDK("mumbai", {
  secretKey:
    "GMDGXcv94FMrhTPxyk9ES4SbJEgTSy9Sj332OJki4B18S52mLLKNUkYYZNem94gkEICQLkRe8Pg6pyNLE5TGuA",
});

// const runEvents = async function () {
//   const contract = await sdk.getContract(
//     "0xfd5700453f4f8a000d1a906e55b59671e20d8c72"
//   );

//   // listen to latest events
//   const latestEvent = await contract.events.getEvents("Transfer", {
//     fromBlock: 0,
//     toBlock: "latest",
//     order: "desc",
//   });
//   // return Number(latestEvent[0].data.value._hex);
//   return latestEvent;
// };

const listenToEvents = async function () {
  const contract = await sdk.getContract(
    "0xfd5700453f4f8a000d1a906e55b59671e20d8c72"
  );

  // listen to latest events
  contract.events.listenToAllEvents((event) => {
    console.log("Transfer event: ", event.data);
  });
  // return Number(latestEvent[0].data.value._hex);
};

async function main() {
  // const result = await runEvents();
  // console.log(result);
  const result = await listenToEvents();
  // console.log(result);
}

main();
