import { BASE_SEPOLIA_FIRST_BLOCK, BASE_FIRST_BLOCK } from "./const.js";

function getFromBlock(network) {
  switch (network) {
    case "sepolia":
      return BASE_SEPOLIA_FIRST_BLOCK;
    case "mainnet":
      return BASE_FIRST_BLOCK;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

export default getFromBlock;
