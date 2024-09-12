import indexEventsForNetwork from "./lib/indexEventsForNetwork.js";

async function indexBothNetworks() {
  await Promise.all([
    indexEventsForNetwork("baseSepolia"),
    indexEventsForNetwork("base"),
    indexEventsForNetwork("zora"),
    indexEventsForNetwork("zoraSepolia")
  ]);
}

indexBothNetworks().catch(console.error);
