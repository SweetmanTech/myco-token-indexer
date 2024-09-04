import fetch from "node-fetch";

// Use alternative RPC URLs for Base Sepolia
const RPC_URLS = [
  "https://sepolia.base.org",
  "https://base-sepolia-rpc.publicnode.com",
  "https://base-sepolia.blockpi.network/v1/rpc/public",
];

// ABI for the SetupNewToken event
const eventSignature =
  "0x1b944478023872bf91b25a13fdba3a686fdb1bf4dbb872f850240fad4b8cc068";

async function rpcRequest(method, params, retries = 3) {
  for (let i = 0; i < retries; i++) {
    for (const url of RPC_URLS) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(`RPC error: ${JSON.stringify(data.error)}`);
        }
        return data.result;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed for ${url}: ${error.message}`);
        if (i === retries - 1 && url === RPC_URLS[RPC_URLS.length - 1])
          throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
  }
}

async function getBlockNumber() {
  return BigInt(await rpcRequest("eth_blockNumber", []));
}

async function getLogs(fromBlock, toBlock) {
  const CHUNK_SIZE = 1000n; // Adjust this value based on RPC limitations
  let allLogs = [];

  for (
    let chunkStart = fromBlock;
    chunkStart <= toBlock;
    chunkStart += CHUNK_SIZE
  ) {
    const chunkEnd =
      chunkStart + CHUNK_SIZE - 1n > toBlock
        ? toBlock
        : chunkStart + CHUNK_SIZE - 1n;
    console.log(`Fetching logs for blocks ${chunkStart} to ${chunkEnd}`);
    const logs = await rpcRequest("eth_getLogs", [
      {
        topics: [eventSignature],
        fromBlock: `0x${chunkStart.toString(16)}`,
        toBlock: `0x${chunkEnd.toString(16)}`,
      },
    ]);
    allLogs = allLogs.concat(logs);
  }

  return allLogs;
}

async function indexEvents() {
  console.log("Starting indexer...");

  try {
    // Get the current block number
    const latestBlock = await getBlockNumber();

    // Calculate the fromBlock (100,000 blocks ago or 0, whichever is greater)
    const fromBlock = latestBlock - 100000n > 0n ? latestBlock - 100000n : 0n;

    console.log(`Fetching events from block ${fromBlock} to ${latestBlock}`);

    // Check for past events
    const pastEvents = await getLogs(fromBlock, latestBlock);

    console.log(`Found ${pastEvents.length} past events`);
    pastEvents.forEach((log) => {
      console.log("Past event:", log);
    });

    console.log("Setting up watcher for new events...");

    // Function to check for new events
    async function checkNewEvents() {
      try {
        const newLatestBlock = await getBlockNumber();
        if (newLatestBlock > latestBlock) {
          const newEvents = await getLogs(latestBlock + 1n, newLatestBlock);
          newEvents.forEach((log) => {
            console.log("New event:", log);
          });
        }
      } catch (error) {
        console.error("Error checking for new events:", error);
      }
    }

    // Check for new events every 15 seconds
    setInterval(checkNewEvents, 15000);

    console.log("Watcher set up. Waiting for new events...");
  } catch (error) {
    console.error("Error in indexEvents:", error);
  }
}

indexEvents().catch(console.error);
