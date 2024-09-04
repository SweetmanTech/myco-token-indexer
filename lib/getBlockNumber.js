import rpcRequest from "./rpcRequest";

async function getBlockNumber(network) {
  return BigInt(await rpcRequest(network, "eth_blockNumber", []));
}

export default getBlockNumber;
