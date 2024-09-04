import indexEventsForNetwork from "./lib/indexEventsForNetwork";

async function indexBothNetworks() {
  await Promise.all([
    indexEventsForNetwork("sepolia"),
    indexEventsForNetwork("mainnet"),
  ]);
}

indexBothNetworks().catch(console.error);
