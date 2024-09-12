import { BASE_SEPOLIA_FIRST_BLOCK, BASE_FIRST_BLOCK, ZORA_FIRST_BLOCK, ZORA_SEPOLIA_FIRST_BLOCK } from "./const.js";

function getFromBlock(network) {
  switch (network) {
    case "baseSepolia":
      return BASE_SEPOLIA_FIRST_BLOCK;
    case "base":
      return BASE_FIRST_BLOCK;
    case "zoraSepolia":
      return ZORA_SEPOLIA_FIRST_BLOCK;
    case "zora":
      return ZORA_FIRST_BLOCK;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

export default getFromBlock;
