import getLogs from "./getLogs.js";
import trackEventWithStack from "./trackEventWithStack.js";

async function processBlocks(network, start, end) {
  const events = await getLogs(network, start, end);
  for (const log of events) {
    console.log(`${network} - Processing event:`, log);
    await trackEventWithStack(network, log);
  }
}

export default processBlocks;
