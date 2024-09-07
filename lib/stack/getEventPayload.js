import convertBigIntToString from "../convertBigIntToString.js";
import decodeEventLog from "../viem/decodeEventLog.js";

const getEventPayload = (network, event) => {
  let decodedLog = decodeEventLog(event);
  console.log("SWEETS DECODED", decodedLog);
  const { user, permissions } = decodedLog.args;
  const convertedEvent = convertBigIntToString({
    ...event,
    decodedLog,
  });

  const payload = {
    name: convertedEvent.decodedLog.eventName || "UnknownEvent",
    account: user,
    uniqueId: `${network}-${event.transactionHash}-${convertedEvent.logIndex}`,
    pointSystemId: process.env.STACK_SYSTEM_ID,
    points: 1,
    metadata: {
      ...convertedEvent.decodedLog.args,
      ...convertBigIntToString({ user, permissions }),
      blockNumber: convertedEvent.blockNumber,
      collection: event.address,
      transactionHash: event.transactionHash,
    },
  };

  console.log("SWEETS PAYLOAD", payload);
  return payload;
};

export default getEventPayload;
