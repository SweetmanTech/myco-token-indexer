import getBlockNumber from "./getBlockNumber.js";
import processBlocks from "./processBlocks.js";

async function getNewEvents() {
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

export default getNewEvents;
