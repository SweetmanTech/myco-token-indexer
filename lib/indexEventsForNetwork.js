import getBlockNumber from "./getBlockNumber.js";
import getLogs from "./getLogs.js";
import trackEventWithStack from "./stack/trackEventWithStack.js";
import getFromBlock from "./getFromBlock.js";

async function indexEventsForNetwork(network) {
  console.log(`Starting indexer for Base ${network}...`);

  try {
    const latestBlock = await getBlockNumber(network);
    let fromBlock = BigInt(getFromBlock(network)); // Start from the earliest block

    console.log(
      `${network} - Backfilling data from block ${fromBlock} to ${latestBlock}`
    );

    async function processBlocks(start, end) {
      const events = await getLogs(network, start, end);
      for (const log of events) {
        console.log(`${network} - Processing event:`, log);
        await trackEventWithStack(network, log);
      }
    }

    // Backfill historical data
    const CHUNK_SIZE = 10000n;
    while (fromBlock <= latestBlock) {
      const toBlock =
        fromBlock + CHUNK_SIZE > latestBlock
          ? latestBlock
          : fromBlock + CHUNK_SIZE;
      await processBlocks(fromBlock, toBlock);
      fromBlock = toBlock + 1n;
    }

    console.log(
      `${network} - Backfilling complete. Setting up watcher for new events...`
    );

    // Set up watcher for new events
    async function checkNewEvents() {
      try {
        const newLatestBlock = await getBlockNumber(network);
        if (newLatestBlock > latestBlock) {
          await processBlocks(latestBlock + 1n, newLatestBlock);
          latestBlock = newLatestBlock;
        }
      } catch (error) {
        console.error(`${network} - Error checking for new events:`, error);
      }
    }

    setInterval(checkNewEvents, 15000);

    console.log(`${network} - Watcher set up. Waiting for new events...`);
  } catch (error) {
    console.error(`${network} - Error in indexEvents:`, error);
  }
}

export default indexEventsForNetwork;
