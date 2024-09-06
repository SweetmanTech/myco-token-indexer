import fetch from "node-fetch";
import { RPC_URLS } from "./rpc.js";

async function rpcRequest(network, method, params, retries = 3) {
  for (let i = 0; i < retries; i++) {
    for (const url of RPC_URLS[network]) {
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
        console.error(
          `${network} - Attempt ${i + 1} failed for ${url}: ${error.message}`
        );
        if (
          i === retries - 1 &&
          url === RPC_URLS[network][RPC_URLS[network].length - 1]
        )
          throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
  }
}

export default rpcRequest;
