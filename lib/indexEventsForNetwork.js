import getBlockNumber from "./getBlockNumber";
import getLogs from "./getLogs";
import trackEventWithStack from "./stack/trackEventWithStack";

async function indexEventsForNetwork(network) {
  console.log(`Starting indexer for Base ${network}...`);

  try {
    const latestBlock = (await getBlockNumber(network)) - 10000n;
    console.log(`${network} - Setting up watcher for new events...`);

    async function checkNewEvents() {
      try {
        const newLatestBlock = await getBlockNumber(network);
        if (newLatestBlock > latestBlock) {
          const newEvents = await getLogs(
            network,
            latestBlock + 1n,
            newLatestBlock
          );
          for (const log of newEvents) {
            console.log(`${network} - New event:`, log);
            await trackEventWithStack(network, log);
          }
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
