# Myco Token Indexer for Zora on Base

This project is a Node.js-based indexer for Zora protocol events on Base & Base Sepolia networks, designed to help developers building applications on Zora.

## Benefits for Zora Developers

This indexer provides several advantages for developers building applications on Zora:

1. **Stack.so Integration**: Automatically tracks events with Stack.so, enabling easy analytics and user engagement features.
2. **Real-time Event Tracking**: Automatically indexes and tracks Zora protocol events on Base networks.
3. **Customizable**: Can be easily modified to focus on specific Zora events or contracts of interest.
4. **Network Flexibility**: Supports both Base mainnet and Base Sepolia testnet.
5. **Efficient Data Processing**: Uses chunked requests and multiple RPC endpoints for reliable data fetching.
6. **Easy Integration**: Simplifies the process of accessing historical and real-time Zora event data.

By using this indexer, developers can focus on building their Zora applications without worrying about the complexities of event indexing and data management.

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/SweetmanTech/myco-token-indexer
   cd myco-token-indexer
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add any necessary environment variables.

## Usage

To run the indexer:

1. Start the indexer:

   ```
   npm start
   ```

2. The indexer will start processing events from the specified network (Base or Base Sepolia).

3. To switch between networks or customize the indexing process, you can modify the following environment variables in your `.env` file:

   - `NETWORK`: Set to either `mainnet` for Base or `sepolia` for Base Sepolia
   - `START_BLOCK`: The block number to start indexing from (optional)
   - `END_BLOCK`: The block number to end indexing at (optional)

4. Monitor the console output for indexing progress and any potential errors.

5. The indexed data will be stored according to the implementation in `indexEventsForNetwork.js`.

## Customization

- To index different events or contracts, modify the `getEventSignature.js` file in the `lib/viem` directory to change the event being tracked.
- Adjust RPC endpoints in `lib/rpc.js` if needed.
- To modify how event data is processed or stored, update the `getEventPayload.js` file in the `lib/stack` directory.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are correctly installed.
2. Check that your `.env` file is properly configured.
3. Verify that you have a stable internet connection for RPC calls.

For more detailed logs, you can modify the logging level in the indexer code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
