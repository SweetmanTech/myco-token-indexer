import dotenv from "dotenv";
import { getAbiItem, encodeEventTopics } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

dotenv.config();

export const BASE_SEPOLIA_FIRST_BLOCK = BigInt(
  process.env.BASE_SEPOLIA_FIRST_BLOCK || "0"
);
export const BASE_FIRST_BLOCK = BigInt(process.env.BASE_FIRST_BLOCK || "0");
