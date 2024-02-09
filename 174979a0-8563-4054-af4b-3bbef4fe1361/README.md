# Angular 1Inch Challange

This Angular application allows users to interact with their Metamask wallet on the Ethereum Sepolia testnet. The app utilizes the Metamask browser extension for wallet connectivity and provides features such as displaying the connected address, showing ETH and WETH balances, and facilitating the transfer of ERC-20 tokens.

## Features

1. **Wallet Connection:**
   - Users can connect their Metamask wallet to the application.
   - The connected wallet address is displayed on the page.

2. **Balance Display:**
   - The app shows the user's ETH and WETH balances.

3. **Token Transfer:**
   - Users can transfer ERC-20 tokens by specifying the amount and recipient address.
   - Example: Transfer 1 DAI to the specified address.

4. **Transaction Handling:**
   - After signing the transaction, the app displays the transaction hash on the page.
   - Error handling is implemented to address possible issues during transaction processing.

## Technologies Used

- Angular: 17.1.0
- Ethereum Sepolia Testnet
- Metamask Browser Extension
- Ethers.js for Ethereum interactions
- Tailwind CSS for styling

## Prerequisites

1. Ensure you have Node.js installed on your machine.
2. Install Angular CLI globally using the command:
   ```bash
   npm install -g @angular/cli@17.1.0 
 ```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/angular-ethereum-wallet-app.git
```

2. Navigate to the project directory:
```
bash
cd angular-ethereum-wallet-app
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
ng serve
```
5. Open your browser and visit http://localhost:4200/ to access the application.

## Usage

1. Connect your Metamask wallet to the application.
2. View your connected wallet address and balances.
3. Use the transfer feature to send ERC-20 tokens to a specified address.