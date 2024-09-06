import getBlockNumber from "./getBlockNumber.js";
import getFromBlock from "./getFromBlock.js";
import getNewEvents from "./getNewEvents.js";
import processBlockRange from "./processBlockRange.js";

async function indexEventsForNetwork(network) {
  console.log(`Starting indexer for Base ${network}...`);
  try {
    const latestBlock = await getBlockNumber(network);
    let fromBlock = BigInt(getFromBlock(network));
    console.log(
      `${network} - Backfilling data from block ${fromBlock} to ${latestBlock}`
    );
    await processBlockRange(fromBlock, latestBlock);
    console.log(
      `${network} - Backfilling complete. Setting up watcher for new events...`
    );
    setInterval(getNewEvents, 15000);
    console.log(`${network} - Watcher set up. Waiting for new events...`);
  } catch (error) {
    console.error(`${network} - Error in indexEvents:`, error);
  }
}

export default indexEventsForNetwork;
