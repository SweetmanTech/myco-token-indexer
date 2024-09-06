import dotenv from "dotenv";

dotenv.config();

export const BASE_SEPOLIA_FIRST_BLOCK = BigInt(
  process.env.BASE_SEPOLIA_FIRST_BLOCK || "0"
);
export const BASE_FIRST_BLOCK = BigInt(process.env.BASE_FIRST_BLOCK || "0");

// ABI for the SetupNewToken event
export const eventSignature =
  "0x1b944478023872bf91b25a13fdba3a686fdb1bf4dbb872f850240fad4b8cc068";
