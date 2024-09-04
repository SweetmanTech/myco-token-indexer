import getBlockNumber from "./getBlockNumber";
import getLogs from "./getLogs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const STACK_API_KEY = process.env.STACK_API_KEY;
const STACK_API_URL = "https://track.stack.so/event";

async function trackEventWithStack(network, event) {
  try {
    const response = await fetch(STACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": STACK_API_KEY,
      },
      body: JSON.stringify([
        {
          name: "SetupNewToken",
          account: event.address, // Assuming the contract address is relevant
          uniqueId: `${network}-${event.transactionHash}-${event.logIndex}`,
          pointSystemId: process.env.STACK_SYSTEM_ID, // Adjust as needed
          points: 1, // Adjust as needed
        },
      ]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Event tracked with Stack.so successfully");
  } catch (error) {
    console.error("Error tracking event with Stack.so:", error);
  }
}

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
