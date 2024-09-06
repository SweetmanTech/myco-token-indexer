import { decodeEventLog as decode } from "viem";

const decodeEventLog = (event) => {
  try {
    decodedLog = decode({
      abi: zoraCreator1155ImplABI,
      data: event.data,
      topics: event.topics,
    });
  } catch (decodeError) {
    console.error("Error decoding event log:", decodeError);
    decodedLog = { eventName: "Unknown", args: {} };
  }
};

export default decodeEventLog;
