import fetch from "node-fetch";
import dotenv from "dotenv";
import { decodeEventLog } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import convertBigIntToString from "../convertBigIntToString.js";

dotenv.config();

export const STACK_API_KEY = process.env.STACK_API_KEY;
export const STACK_API_URL = "https://track.stack.so/event";

async function trackEventWithStack(network, event) {
  try {
    let decodedLog;
    try {
      decodedLog = decodeEventLog({
        abi: zoraCreator1155ImplABI,
        data: event.data,
        topics: event.topics,
      });
    } catch (decodeError) {
      console.error("Error decoding event log:", decodeError);
      decodedLog = { eventName: "Unknown", args: {} };
    }
    console.log("SWEETS DECODED", decodedLog);

    // Convert BigInt values to strings in the entire event object
    const convertedEvent = convertBigIntToString({
      ...event,
      decodedLog,
    });
    console.log("SWEETS convertedEvent", convertedEvent);
    console.log(
      "SWEETS process.env.STACK_SYSTEM_ID",
      process.env.STACK_SYSTEM_ID
    );

    const payload = {
      name: convertedEvent.decodedLog.eventName || "UnknownEvent",
      account: event.address,
      uniqueId: `${network}-${event.transactionHash}-${convertedEvent.logIndex}`,
      pointSystemId: process.env.STACK_SYSTEM_ID,
      points: 1,
      metadata: {
        ...convertedEvent.decodedLog.args,
        blockNumber: convertedEvent.blockNumber,
        collection: event.address,
        sender: decodedLog.args.sender,
        transactionHash: event.transactionHash,
      },
    };
    console.log("SWEETS PAYLOAD", payload);

    const response = await fetch(STACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": STACK_API_KEY,
      },
      body: JSON.stringify([payload]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Event tracked with Stack.so successfully");
  } catch (error) {
    console.error("Error tracking event with Stack.so:", error);
  }
}

export default trackEventWithStack;
