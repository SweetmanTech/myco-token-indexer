import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const STACK_API_KEY = process.env.STACK_API_KEY;
export const STACK_API_URL = "https://track.stack.so/event";

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
          account: event.address,
          uniqueId: `${network}-${event.transactionHash}-${event.logIndex}`,
          pointSystemId: process.env.STACK_SYSTEM_ID,
          points: 1,
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

export default trackEventWithStack;
