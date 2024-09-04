import indexEventsForNetwork from "./lib/indexEventsForNetwork";
import dotenv from "dotenv";

dotenv.config();

async function indexBothNetworks() {
  await Promise.all([
    indexEventsForNetwork("sepolia"),
    indexEventsForNetwork("mainnet"),
  ]);
}

indexBothNetworks().catch(console.error);
