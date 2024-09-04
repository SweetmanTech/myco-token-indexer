# Base Indexer

This project is a Node.js-based indexer for blockchain events, supporting both Base & Base Sepolia networks.

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

- To index different events or contracts, modify the `indexEventsForNetwork.js` file in the `lib` directory.
- Adjust RPC endpoints in `lib/rpc.js` if needed.

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
