import indexEventsForNetwork from "./lib/indexEventsForNetwork.js";

async function indexBothNetworks() {
  await Promise.all([
    indexEventsForNetwork("sepolia"),
    indexEventsForNetwork("mainnet"),
    indexEventsForNetwork("zora"),
    indexEventsForNetwork("zoraSepolia")
  ]);
}

indexBothNetworks().catch(console.error);
