import convertBigIntToString from "../convertBigIntToString.js";
import decodeEventLog from "../viem/decodeEventLog.js";

const getEventPayload = (network, event) => {
  let decodedLog = decodeEventLog(event);

  const convertedEvent = convertBigIntToString({
    ...event,
    decodedLog,
  });

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
  return payload;
};

export default getEventPayload;
